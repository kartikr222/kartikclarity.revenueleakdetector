import { createClient } from '@supabase/supabase-js'
import { DiagnosisInput, DiagnosisResponse } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function submitDiagnosis(input: DiagnosisInput): Promise<DiagnosisResponse> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error:
        'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your deployment environment.',
    }
  }
  try {
    const { data, error } = await supabase.functions.invoke('diagnose', {
      body: input,
    })

    if (error) {
      console.error('Supabase function error:', error)
      return {
        success: false,
        error: error.message || 'Failed to process diagnosis',
      }
    }

    if (!data || typeof data.score !== 'number') {
      return {
        success: false,
        error: data?.error || 'Invalid response from diagnosis service',
      }
    }

    return {
      success: true,
      data: {
        score: data.score,
        categories: data.categories || [],
        summary: data.summary || '',
      },
    }
  } catch (err) {
    console.error('API error:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
    }
  }
}
