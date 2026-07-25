import { createClient } from '@supabase/supabase-js'

const defaultSupabaseUrl = 'https://ptktvwvgxbitpackbfwo.supabase.co'
const defaultSupabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0a3R2d3ZneGJpdHBhY2tiZndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTE3MjUsImV4cCI6MjEwMDQ4NzcyNX0.NCnrxp9Dxrm1f8xfpjaKCu4IlvuyWviBS9eTwN32CPI'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() || defaultSupabaseUrl

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || defaultSupabaseAnonKey

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0

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