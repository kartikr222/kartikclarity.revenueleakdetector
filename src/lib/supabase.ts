import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://ptktvwvgxbitpackbfwo.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured =
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0

export const supabaseConfigError = isSupabaseConfigured
  ? undefined
  : 'Supabase environment variables are not configured.'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
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