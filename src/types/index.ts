export interface DiagnosisInput {
  email?: string
  annualRevenue: number
  monthlyExpenses: number
  cac: number
  ltv: number
  churnRate: number
  averageDealSize: number
  salesCycleLength: number
  industry: string
}

export interface LeakCategory {
  name: string
  description: string
  impact_usd: number
  recommendations: string[]
}

export interface DiagnosisResult {
  score: number
  categories: LeakCategory[]
  summary: string
}

export interface DiagnosisResponse {
  success: boolean
  data?: DiagnosisResult
  error?: string
}
