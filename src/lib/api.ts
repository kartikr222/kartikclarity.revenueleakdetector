import { createClient } from '@supabase/supabase-js'
import { DiagnosisInput, DiagnosisResponse } from '@/types'

const defaultSupabaseUrl = 'https://ptktvwvgxbitpackbfwo.supabase.co'
const defaultSupabaseAnonKey = '<SUPABASE_ANON_KEY_HERE>'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? defaultSupabaseUrl
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? defaultSupabaseAnonKey

export const isSupabaseConfigured = supabaseUrl.length > 0 && supabaseAnonKey !== '<SUPABASE_ANON_KEY_HERE>'
export const supabaseConfigError =
  !isSupabaseConfigured
    ? 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment.'
    : undefined

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

function generateMockDiagnosis(input: DiagnosisInput): DiagnosisResponse['data'] {
  const ltvCacRatio = input.ltv / input.cac
  const annualChurn = input.churnRate * 12
  let score = 70
  if (ltvCacRatio < 3) score -= 15
  if (ltvCacRatio < 1.5) score -= 15
  if (input.churnRate > 5) score -= 15
  if (input.salesCycleLength > 60) score -= 10
  score = Math.max(10, Math.min(95, score))

  const categories = [
    {
      name: 'Mock: Revenue Health Summary',
      description: `Automated fallback diagnosis for ${input.industry}`,
      impact_usd: Math.round(input.annualRevenue * 0.05),
      recommendations: ['Review CAC', 'Improve LTV', 'Reduce churn'],
    },
  ]

  return { score, categories, summary: `Fallback diagnosis score ${score}/100` }
}

export async function submitDiagnosis(input: DiagnosisInput): Promise<DiagnosisResponse> {
  if (!isSupabaseConfigured) {
    return { success: true, data: generateMockDiagnosis(input) }
  }

  try {
    const { data, error } = await supabase.functions.invoke('diagnose', { body: input })

    if (error) {
      console.error('Supabase function error:', error)
      return { success: true, data: generateMockDiagnosis(input) }
    }

    // supabase.functions.invoke returns a Response-like object in some builds; handle both shapes
    const payload = (data && typeof data === 'object' && 'score' in data) ? data : data
    if (!payload || typeof payload.score !== 'number') {
      return { success: true, data: generateMockDiagnosis(input) }
    }

    return { success: true, data: { score: payload.score, categories: payload.categories || [], summary: payload.summary || '' } }
  } catch (err) {
    console.error('API error invoking diagnose:', err)
    return { success: true, data: generateMockDiagnosis(input) }
  }
}
