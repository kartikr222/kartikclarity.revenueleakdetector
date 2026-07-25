import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { z } from 'https://esm.sh/zod@3.22.4'

<<<<<<< HEAD
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
=======
// For production, set `GEMINI_API_KEY` as a Supabase secret. During local
// development you can set the env var or use a local `.env` file. Do NOT
// commit real keys to the repository.
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') ?? '<GEMINI_API_KEY_HERE>'
>>>>>>> d46c202 (Remove hardcoded secrets from code; use placeholders)
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ---- Validation ----------------------------------------------------------

const DiagnosisInputSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  annualRevenue: z.number().positive(),
  monthlyExpenses: z.number().nonnegative(),
  cac: z.number().positive(),
  ltv: z.number().positive(),
  churnRate: z.number().min(0).max(100),
  averageDealSize: z.number().positive(),
  salesCycleLength: z.number().positive(),
  industry: z.string().min(1),
})

type DiagnosisInput = z.infer<typeof DiagnosisInputSchema>

const LeakCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  impact_usd: z.number(),
  recommendations: z.array(z.string()),
})

const GeminiResponseSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  categories: z.array(LeakCategorySchema).min(1),
})

type GeminiResponse = z.infer<typeof GeminiResponseSchema>

// ---- Handler ---------------------------------------------------------------

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const rawInput = await req.json()
    const parsedInput = DiagnosisInputSchema.safeParse(rawInput)

    if (!parsedInput.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsedInput.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const input = parsedInput.data

    let diagnosis: GeminiResponse
    try {
      diagnosis = await callGeminiAPI(input)
    } catch (err) {
      console.error('Gemini call failed, using fallback:', err)
      diagnosis = generateMockDiagnosis(input)
    }

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        const { error: dbError } = await supabase.from('diagnoses').insert({
          email: input.email || null,
          inputs: input,
          score: diagnosis.score,
          categories: diagnosis.categories,
          raw_response: JSON.stringify(diagnosis),
          ip_address: req.headers.get('x-forwarded-for') || null,
        })
        if (dbError) console.error('Database insert error:', dbError)
      } catch (dbErr) {
        console.error('Database client error:', dbErr)
      }
    }

    return new Response(JSON.stringify(diagnosis), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Unhandled error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// ---- Gemini ----------------------------------------------------------------

async function callGeminiAPI(input: DiagnosisInput): Promise<GeminiResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  const ltvCacRatio = (input.ltv / input.cac).toFixed(2)
  const annualChurn = (input.churnRate * 12).toFixed(1)
  const annualBurn = input.monthlyExpenses * 12

  const prompt = `You are a revenue leak diagnosis expert. Analyze the following business metrics and provide a comprehensive revenue leak diagnosis.

Business Metrics:
- Industry: ${input.industry}
- Annual Revenue: $${input.annualRevenue}
- Monthly Expenses: $${input.monthlyExpenses}
- Customer Acquisition Cost (CAC): $${input.cac}
- Customer Lifetime Value (LTV): $${input.ltv}
- Monthly Churn Rate: ${input.churnRate}%
- Average Deal Size: $${input.averageDealSize}
- Sales Cycle Length: ${input.salesCycleLength} days

Calculated ratios:
- LTV:CAC ratio = ${ltvCacRatio}
- Approximate annual churn = ${annualChurn}%
- Annual expense burn = $${annualBurn}

Respond with ONLY valid JSON in this exact shape, no markdown fences, no extra text:
{
  "score": <integer 0-100, 100 is perfect revenue health>,
  "summary": "<2-3 sentence executive summary>",
  "categories": [
    {
      "name": "<leak category name>",
      "description": "<about 50 words describing the issue>",
      "impact_usd": <estimated annual revenue impact in dollars, a number>,
      "recommendations": ["<action 1>", "<action 2>", "<action 3>"]
    }
  ]
}

Score using LTV:CAC ratio (ideal 3:1+), churn rate (>5% monthly is concerning), sales efficiency, and expense management relative to industry norms.
Identify 3 to 5 leak categories such as high churn, poor LTV:CAC ratio, inefficient sales cycle, expense bloat, pricing gaps, or acquisition inefficiency, with dollar-specific impact_usd values grounded in the metrics above.`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Gemini API error:', errorText)
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  const textResponse: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!textResponse) {
    throw new Error('Gemini returned an empty response')
  }

  let jsonText = textResponse.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '')
  }

  let candidate: unknown
  try {
    candidate = JSON.parse(jsonText)
  } catch (parseErr) {
    console.error('Failed to parse Gemini JSON:', jsonText)
    throw parseErr
  }

  const validated = GeminiResponseSchema.safeParse(candidate)
  if (!validated.success) {
    console.error('Gemini response failed schema validation:', validated.error.flatten())
    throw new Error('Malformed Gemini response')
  }

  return validated.data
}

// ---- Deterministic fallback --------------------------------------------
// Used if the Gemini call fails or returns malformed JSON, so a demo
// or live submission never breaks the user-facing flow.

function generateMockDiagnosis(input: DiagnosisInput): GeminiResponse {
  const ltvCacRatio = input.ltv / input.cac
  const annualChurn = input.churnRate * 12
  const annualBurn = input.monthlyExpenses * 12

  let score = 70
  if (ltvCacRatio < 3) score -= 15
  if (ltvCacRatio < 1.5) score -= 15
  if (input.churnRate > 5) score -= 15
  if (input.salesCycleLength > 60) score -= 10
  if (annualBurn > input.annualRevenue * 0.8) score -= 10
  score = Math.max(10, Math.min(95, score))

  const categories: GeminiResponse['categories'] = []

  if (ltvCacRatio < 3) {
    categories.push({
      name: 'Weak LTV to CAC Ratio',
      description: `Your LTV:CAC ratio is ${ltvCacRatio.toFixed(2)}:1, below the healthy 3:1 benchmark. You are spending too much to acquire customers relative to what they are worth over time.`,
      impact_usd: Math.round(input.cac * (input.annualRevenue / Math.max(input.averageDealSize, 1)) * 0.15),
      recommendations: [
        'Tighten targeting to reduce wasted acquisition spend',
        'Increase average deal size through bundling or upsells',
        'Extend customer lifetime with a structured onboarding and retention program',
      ],
    })
  }

  if (input.churnRate > 3) {
    categories.push({
      name: 'Elevated Customer Churn',
      description: `A ${input.churnRate}% monthly churn rate compounds to roughly ${annualChurn.toFixed(1)}% annually, steadily eroding recurring revenue you already paid to acquire.`,
      impact_usd: Math.round(input.annualRevenue * (input.churnRate / 100) * 0.6),
      recommendations: [
        'Run exit interviews to identify the top 3 churn triggers',
        'Build a proactive health-score alert for at-risk accounts',
        'Introduce a save offer at the cancellation step',
      ],
    })
  }

  if (input.salesCycleLength > 45) {
    categories.push({
      name: 'Extended Sales Cycle',
      description: `A ${input.salesCycleLength}-day sales cycle delays cash flow and ties up sales capacity that could be spent on new pipeline.`,
      impact_usd: Math.round(input.averageDealSize * (input.salesCycleLength / 30) * 8),
      recommendations: [
        'Map the deal stages where prospects stall and remove friction there',
        'Introduce mutual action plans with target close dates',
        'Equip reps with ROI calculators to speed up economic buy-in',
      ],
    })
  }

  if (annualBurn > input.annualRevenue * 0.7) {
    categories.push({
      name: 'Expense to Revenue Imbalance',
      description: `Annual expenses of $${annualBurn.toLocaleString()} consume a large share of your $${input.annualRevenue.toLocaleString()} revenue, leaving thin margin to reinvest in growth.`,
      impact_usd: Math.round(annualBurn * 0.1),
      recommendations: [
        'Audit recurring software and vendor spend for consolidation',
        'Tie discretionary spend to revenue milestones',
        'Renegotiate top 3 vendor contracts annually',
      ],
    })
  }

  if (categories.length === 0) {
    categories.push({
      name: 'Renewal and Expansion Gap',
      description: `Your core metrics are healthy for ${input.industry}. The next leak to close is usually under-monetized expansion revenue from existing accounts.`,
      impact_usd: Math.round(input.annualRevenue * 0.05),
      recommendations: [
        'Build a structured quarterly business review for top accounts',
        'Introduce usage-based upsell triggers',
        'Formalize a referral program for your happiest customers',
      ],
    })
  }

  return {
    score,
    summary: `Your ${input.industry} business scores ${score}/100 on revenue health. The largest opportunities are concentrated in ${categories.length} area${categories.length > 1 ? 's' : ''}, representing recoverable revenue if addressed in the next two quarters.`,
    categories,
  }
}
