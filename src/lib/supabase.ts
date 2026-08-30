import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabaseConfigError = isSupabaseConfigured
  ? undefined
  : 'Supabase environment variables are not configured.'

export const supabase = isSupabaseConfigured && supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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