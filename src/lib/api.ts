import { supabase, isSupabaseConfigured } from './supabase'
import { DiagnosisInput, DiagnosisResponse } from '@/types'


function generateMockDiagnosis(
  input: DiagnosisInput
): DiagnosisResponse['data'] {

  const ltv = Number(input.ltv || 0)
  const cac = Number(input.cac || 0)
  const churn = Number(input.churnRate || 0)
  const revenue = Number(input.annualRevenue || 0)

  const ltvCacRatio =
    cac > 0 ? ltv / cac : 0


  let score = 75


  if (ltvCacRatio < 3) {
    score -= 15
  }

  if (ltvCacRatio < 1.5) {
    score -= 15
  }

  if (churn > 5) {
    score -= 15
  }

  if (Number(input.salesCycleLength || 0) > 60) {
    score -= 10
  }


  score = Math.max(
    10,
    Math.min(95, score)
  )


  return {

    score,

    categories: [
      {
        name:
          'Customer Acquisition Efficiency',

        description:
          `Your current LTV:CAC ratio is ${ltvCacRatio.toFixed(1)}. Improving acquisition efficiency can unlock additional revenue.`,

        impact_usd:
          Math.round(revenue * 0.05),

        recommendations: [
          'Reduce customer acquisition costs',
          'Improve conversion rates',
          'Increase customer lifetime value'
        ]
      },

      {
        name:
          'Retention Opportunity',

        description:
          `Current churn rate is ${churn}%. Reducing churn directly improves predictable revenue.`,

        impact_usd:
          Math.round(revenue * 0.03),

        recommendations: [
          'Create retention campaigns',
          'Improve onboarding',
          'Track customer health scores'
        ]
      }
    ],


    summary:
      `Revenue Leak Score: ${score}/100. Potential improvements identified across acquisition and retention.`
  }
}



export async function submitDiagnosis(
  input: DiagnosisInput
): Promise<DiagnosisResponse> {


  try {


    if (!isSupabaseConfigured) {

      console.warn(
        'Supabase unavailable, using fallback diagnosis'
      )

      return {
        success: true,
        data: generateMockDiagnosis(input)
      }
    }



    const {
      data,
      error

    } = await supabase.functions.invoke(
      'diagnose',
      {
        body: input
      }
    )



    if (error) {

      console.error(
        'Supabase diagnose error:',
        error
      )


      return {
        success: true,
        data: generateMockDiagnosis(input)
      }
    }




    if (
      !data ||
      typeof data.score !== 'number'
    ) {


      return {
        success: true,
        data: generateMockDiagnosis(input)
      }

    }



    return {

      success: true,

      data: {

        score: data.score,

        categories:
          data.categories || [],

        summary:
          data.summary ||
          'Diagnosis completed successfully.'

      }

    }



  } catch (error) {


    console.error(
      'Diagnosis API failure:',
      error
    )



    return {

      success: true,

      data:
        generateMockDiagnosis(input)

    }

  }

}