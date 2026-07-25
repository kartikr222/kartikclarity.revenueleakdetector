import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://ptktvwvgxbitpackbfwo.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured =
  Boolean(supabaseUrl)

export const supabaseConfigError =
  undefined

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'public-anon-key-placeholder'
)

export interface DiagnosisFormData {
  businessType: string
  revenue: string
  challenges: string[]
  pain: string
}

export interface DiagnosisReport {
  executiveSummary: string
  identifiedLeaks: Array<{
    category: string
    severity: string
    impact: string
    description: string
  }>
  recommendations: Array<{
    priority: string
    action: string
    expectedImpact: string
    timeline: string
    implementation: string
  }>
  estimatedRecovery: string
}

export async function generateDiagnosis(
  formData: DiagnosisFormData
): Promise<DiagnosisReport> {

  try {

    const { data, error } =
      await supabase.functions.invoke(
        'diagnose',
        {
          body: formData,
        }
      )

    if (error) {
      console.error(
        'Supabase function error:',
        error
      )

      throw error
    }

    if (!data || !data.report) {
      throw new Error(
        'Invalid response from diagnosis service'
      )
    }

    return data.report

  } catch (error) {

    console.error(
      'Diagnosis generation failed:',
      error
    )

    throw error
  }
}