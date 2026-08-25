import { supabase, isSupabaseConfigured } from './supabase'
import { DiagnosisInput, DiagnosisResponse, DiagnosisResult } from '@/types'

/**
 * Deterministic client-side diagnosis used whenever the remote diagnosis
 * service is unavailable, returns an invalid payload, or throws.
 * The report flow must never strand a user on the diagnosis form.
 */
export function generateMockDiagnosis(input: DiagnosisInput): DiagnosisResult {
  const ltv = Number(input.ltv || 0)
  const cac = Number(input.cac || 0)
  const churn = Number(input.churnRate || 0)
  const revenue = Number(input.annualRevenue || 0)
  const salesCycle = Number(input.salesCycleLength || 0)

  const ltvCacRatio = cac > 0 ? ltv / cac : 0

  let score = 75

  if (cac > 0 && ltvCacRatio < 3) score -= 15
  if (cac > 0 && ltvCacRatio < 1.5) score -= 15
  if (churn > 5) score -= 15
  if (salesCycle > 60) score -= 10

  score = Math.max(10, Math.min(95, score))

  return {
    score,
    categories: [
      {
        name: 'Customer Acquisition Efficiency',
        description:
          cac > 0
            ? `Your current LTV:CAC ratio is ${ltvCacRatio.toFixed(1)}. Improving acquisition efficiency can unlock additional revenue.`
            : 'Acquisition economics should be reviewed to ensure customer acquisition spend is producing efficient revenue growth.',
        impact_usd: Math.round(revenue * 0.05),
        recommendations: [
          'Reduce customer acquisition costs',
          'Improve conversion rates',
          'Increase customer lifetime value',
        ],
      },
      {
        name: 'Retention Opportunity',
        description: `Current churn rate is ${churn}%. Reducing churn directly improves predictable revenue.`,
        impact_usd: Math.round(revenue * 0.03),
        recommendations: [
          'Create retention campaigns',
          'Improve onboarding',
          'Track customer health scores',
        ],
      },
    ],
    summary: `Revenue Leak Score: ${score}/100. Potential improvements identified across acquisition and retention.`,
  }
}

function success(data: DiagnosisResult): DiagnosisResponse {
  return { success: true, data }
}

/**
 * The report generation contract is intentionally fail-open: a diagnosis
 * should still be generated when Supabase/Gemini is unavailable. The remote
 * service improves the report, but it is never a hard dependency for the CTA.
 */
export async function submitDiagnosis(
  input: DiagnosisInput
): Promise<DiagnosisResponse> {
  const fallback = () => success(generateMockDiagnosis(input))

  try {
    if (!isSupabaseConfigured) {
      console.warn('Supabase unavailable; using local diagnosis fallback.')
      return fallback()
    }

    const { data, error } = await supabase.functions.invoke('diagnose', {
      body: input,
    })

    if (error) {
      console.error('Supabase diagnose error; using local fallback:', error)
      return fallback()
    }

    if (!data || typeof data !== 'object' || typeof data.score !== 'number') {
      console.error('Diagnosis service returned an invalid payload; using local fallback.')
      return fallback()
    }

    return success({
      score: data.score,
      categories: Array.isArray(data.categories) ? data.categories : [],
      summary: data.summary || 'Diagnosis completed successfully.',
    })
  } catch (error) {
    console.error('Diagnosis API failure; using local fallback:', error)
    return fallback()
  }
}
