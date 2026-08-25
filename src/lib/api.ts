import { supabase, isSupabaseConfigured } from './supabase'
import { DiagnosisInput, DiagnosisResponse, DiagnosisResult } from '@/types'

/**
 * Deterministic client-side diagnosis. This is a production safety net:
 * report generation must never depend on Supabase, Gemini, or network health.
 */
export function generateMockDiagnosis(input: DiagnosisInput): DiagnosisResult {
  const ltv = Number(input.ltv || 0)
  const cac = Number(input.cac || 0)
  const churn = Number(input.churnRate || 0)
  const revenue = Number(input.annualRevenue || 0)
  const salesCycle = Number(input.salesCycleLength || 0)
  const averageDealSize = Number(input.averageDealSize || 0)
  const monthlyExpenses = Number(input.monthlyExpenses || 0)

  const ltvCacRatio = cac > 0 ? ltv / cac : 0
  const annualChurn = churn * 12
  const annualExpenses = monthlyExpenses * 12

  let score = 70
  if (cac > 0 && ltvCacRatio < 3) score -= 15
  if (cac > 0 && ltvCacRatio < 1.5) score -= 15
  if (churn > 5) score -= 15
  if (salesCycle > 60) score -= 10
  if (annualExpenses > revenue * 0.8) score -= 10
  score = Math.max(10, Math.min(95, score))

  const categories: DiagnosisResult['categories'] = []

  if (ltvCacRatio < 3) {
    categories.push({
      name: 'Weak LTV to CAC Ratio',
      description: `Your LTV:CAC ratio is ${ltvCacRatio.toFixed(2)}:1, below the healthy 3:1 benchmark. Acquisition spend is currently high relative to customer value.`,
      impact_usd: Math.round(cac * (revenue / Math.max(averageDealSize, 1)) * 0.15),
      recommendations: [
        'Tighten targeting to reduce wasted acquisition spend',
        'Increase average deal size through bundling or upsells',
        'Extend customer lifetime with structured onboarding and retention',
      ],
    })
  }

  if (churn > 3) {
    categories.push({
      name: 'Elevated Customer Churn',
      description: `A ${churn}% monthly churn rate compounds to approximately ${annualChurn.toFixed(1)}% annually, steadily eroding recurring revenue you already paid to acquire.`,
      impact_usd: Math.round(revenue * (churn / 100) * 0.6),
      recommendations: [
        'Run exit interviews to identify the top churn triggers',
        'Create proactive customer-health alerts for at-risk accounts',
        'Introduce a save offer at the cancellation step',
      ],
    })
  }

  if (salesCycle > 45) {
    categories.push({
      name: 'Extended Sales Cycle',
      description: `A ${salesCycle}-day sales cycle delays cash flow and ties up sales capacity that could be spent on new pipeline.`,
      impact_usd: Math.round(averageDealSize * (salesCycle / 30) * 8),
      recommendations: [
        'Map the deal stages where prospects stall and remove friction',
        'Introduce mutual action plans with target close dates',
        'Equip reps with ROI calculators to accelerate economic buy-in',
      ],
    })
  }

  if (annualExpenses > revenue * 0.7) {
    categories.push({
      name: 'Expense to Revenue Imbalance',
      description: `Annual expenses of $${annualExpenses.toLocaleString()} consume a large share of $${revenue.toLocaleString()} revenue, limiting reinvestment capacity.`,
      impact_usd: Math.round(annualExpenses * 0.1),
      recommendations: [
        'Audit recurring software and vendor spend for consolidation',
        'Tie discretionary spend to revenue milestones',
        'Renegotiate major vendor contracts annually',
      ],
    })
  }

  if (categories.length === 0) {
    categories.push({
      name: 'Renewal and Expansion Gap',
      description: `Your core metrics are comparatively healthy for ${input.industry}. The next opportunity is usually under-monetized expansion revenue from existing accounts.`,
      impact_usd: Math.round(revenue * 0.05),
      recommendations: [
        'Build structured quarterly business reviews for top accounts',
        'Introduce usage-based upsell triggers',
        'Formalize a referral program for satisfied customers',
      ],
    })
  }

  return {
    score,
    categories,
    summary: `Your ${input.industry} business scores ${score}/100 on revenue health. The largest opportunities are concentrated in ${categories.length} area${categories.length === 1 ? '' : 's'}, representing recoverable revenue if addressed systematically.`,
  }
}

function success(data: DiagnosisResult): DiagnosisResponse {
  return { success: true, data }
}

function isValidDiagnosisResult(value: unknown): value is DiagnosisResult {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  if (typeof candidate.score !== 'number' || !Number.isFinite(candidate.score)) return false
  if (candidate.score < 0 || candidate.score > 100) return false
  if (typeof candidate.summary !== 'string') return false
  if (!Array.isArray(candidate.categories) || candidate.categories.length === 0) return false

  return candidate.categories.every((category) => {
    if (!category || typeof category !== 'object') return false
    const item = category as Record<string, unknown>
    return (
      typeof item.name === 'string' &&
      typeof item.description === 'string' &&
      typeof item.impact_usd === 'number' &&
      Number.isFinite(item.impact_usd) &&
      Array.isArray(item.recommendations) &&
      item.recommendations.every((recommendation) => typeof recommendation === 'string')
    )
  })
}

/**
 * Fail-open report generation.
 * The remote diagnosis service can enrich the report, but it can never block
 * the CTA. Any remote failure falls through to deterministic local diagnosis.
 */
export async function submitDiagnosis(
  input: DiagnosisInput
): Promise<DiagnosisResponse> {
  const fallback = () => success(generateMockDiagnosis(input))

  if (!isSupabaseConfigured) {
    console.warn('Supabase unavailable; using local diagnosis fallback.')
    return fallback()
  }

  try {
    const remoteRequest = supabase.functions.invoke('diagnose', {
      body: input,
    })

    const timeout = new Promise<never>((_, reject) => {
      window.setTimeout(() => reject(new Error('Diagnosis request timed out')), 8000)
    })

    const { data, error } = await Promise.race([remoteRequest, timeout])

    if (error || !isValidDiagnosisResult(data)) {
      console.warn('Remote diagnosis unavailable or invalid; using local fallback.')
      return fallback()
    }

    return success(data)
  } catch (error) {
    console.warn('Remote diagnosis failed; using local fallback.', error)
    return fallback()
  }
}
