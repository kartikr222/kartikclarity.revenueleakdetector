import { createClient } from '@supabase/supabase-js'
import { DiagnosisInput, DiagnosisResponse } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitDiagnosis(input: DiagnosisInput): Promise<DiagnosisResponse> {
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
