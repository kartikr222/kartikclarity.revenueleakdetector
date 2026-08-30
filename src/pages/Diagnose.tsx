import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { submitDiagnosis } from '@/lib/api'
import { useDiagnosis } from '@/context/DiagnosisContext'
import { DiagnosisInput } from '@/types'
import { Loader2 } from 'lucide-react'

const industries = [
  'SaaS',
  'E-commerce',
  'Professional Services',
  'Healthcare',
  'Fintech',
  'Manufacturing',
  'Other',
]

export default function Diagnose() {
  const navigate = useNavigate()
  const { setResult, setInput } = useDiagnosis()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<DiagnosisInput>({
    email: '',
    annualRevenue: 0,
    monthlyExpenses: 0,
    cac: 0,
    ltv: 0,
    churnRate: 0,
    averageDealSize: 0,
    salesCycleLength: 0,
    industry: '',
  })

  const handleNumberChange = (
    field: keyof DiagnosisInput,
    value: string
  ) => {
    const parsed = value === '' ? 0 : Number(value)
    setFormData({
      ...formData,
      [field]: Number.isFinite(parsed) ? parsed : 0,
    })
  }

  const validateForm = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address.'
    }

    if (!formData.industry) {
      return 'Please select an industry.'
    }

    const checks: Array<[string, number]> = [
      ['Annual revenue', formData.annualRevenue],
      ['Monthly expenses', formData.monthlyExpenses],
      ['Customer acquisition cost', formData.cac],
      ['Customer lifetime value', formData.ltv],
      ['Churn rate', formData.churnRate],
      ['Average deal size', formData.averageDealSize],
      ['Sales cycle length', formData.salesCycleLength],
    ]

    for (const [label, value] of checks) {
      if (!Number.isFinite(value) || value <= 0) {
        return `${label} must be greater than 0.`
      }
    }

    if (formData.churnRate > 100) {
      return 'Monthly churn rate must be less than or equal to 100%.'
    }

    return null
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const validationMessage = validateForm()
    if (validationMessage) {
      setError(validationMessage)
      setLoading(false)
      return
    }

    try {
      const response = await submitDiagnosis(formData)

      if (response.success && response.data) {
        setResult(response.data)
        setInput(formData)
        navigate('/report')
      } else {
        setError(
          response.error ||
            'Failed to process diagnosis'
        )
      }
    } catch (err) {
      console.error(err)
      setError(
        'An unexpected error occurred. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Revenue Leak Diagnosis
          </h1>

          <p className="text-lg text-cream/70">
            Answer 8 quick questions to reveal
            your hidden revenue leaks.
          </p>
        </div>

        <Card className="border-cream/20 bg-navy/40 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-cream">
              Business Metrics
            </CardTitle>

            <CardDescription className="text-cream/60">
              All information is confidential
              and used only for your diagnosis.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cream">
                  Email (optional)
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualRevenue" className="text-cream">
                  Annual Revenue ($)
                </Label>

                <Input
                  id="annualRevenue"
                  type="number"
                  required
                  value={formData.annualRevenue || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'annualRevenue',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses" className="text-cream">
                  Monthly Expenses ($)
                </Label>

                <Input
                  id="monthlyExpenses"
                  type="number"
                  required
                  value={formData.monthlyExpenses || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'monthlyExpenses',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cac" className="text-cream">
                  Customer Acquisition Cost (CAC)
                </Label>

                <Input
                  id="cac"
                  type="number"
                  required
                  value={formData.cac || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'cac',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ltv" className="text-cream">
                  Customer Lifetime Value (LTV)
                </Label>

                <Input
                  id="ltv"
                  type="number"
                  required
                  value={formData.ltv || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'ltv',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churnRate" className="text-cream">
                  Monthly Churn Rate (%)
                </Label>

                <Input
                  id="churnRate"
                  type="number"
                  step="0.1"
                  required
                  value={formData.churnRate || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'churnRate',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageDealSize" className="text-cream">
                  Average Deal Size ($)
                </Label>

                <Input
                  id="averageDealSize"
                  type="number"
                  required
                  value={formData.averageDealSize || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'averageDealSize',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesCycleLength" className="text-cream">
                  Sales Cycle Length (days)
                </Label>

                <Input
                  id="salesCycleLength"
                  type="number"
                  required
                  value={formData.salesCycleLength || ''}
                  onChange={(e) =>
                    handleNumberChange(
                      'salesCycleLength',
                      e.target.value
                    )
                  }
                  className="bg-navy/60 border-cream/30 text-cream"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-cream">
                  Industry
                </Label>

                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      industry: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-navy/60 border-cream/30 text-cream">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>

                  <SelectContent className="bg-navy border-cream/30">
                    {industries.map((industry) => (
                      <SelectItem
                        key={industry}
                        value={industry}
                      >
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error && (
                <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cream py-6 text-lg font-semibold text-navy hover:bg-cream/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate My Revenue Leak Report'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}