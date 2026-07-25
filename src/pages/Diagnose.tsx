import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { submitDiagnosis } from '@/lib/api'
import { isSupabaseConfigured } from '@/lib/supabase'
import { useDiagnosis } from '@/context/DiagnosisContext'
import { DiagnosisInput } from '@/types'
import { Loader2 } from 'lucide-react'

const industries = ['SaaS', 'E-commerce', 'Professional Services', 'Healthcare', 'Fintech', 'Manufacturing', 'Other']

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.industry) {
      setError('Please select an industry')
      setLoading(false)
      return
    }
    if (formData.annualRevenue <= 0) {
      setError('Annual revenue must be greater than 0')
      setLoading(false)
      return
    }
      const response = await submitDiagnosis(formData)
      if (response.success && response.data) {
        setResult(response.data)
        setInput(formData)
        navigate('/report')
      } else {
        setError(response.error || 'Failed to process diagnosis')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNumberChange = (field: keyof DiagnosisInput, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData({ ...formData, [field]: numValue })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4">Revenue Leak Diagnosis</h1>
          <p className="text-cream/70 text-lg">Answer 8 quick questions to reveal your hidden revenue leaks</p>
        </div>

        <Card className="bg-navy/40 border-cream/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-cream text-2xl">Business Metrics</CardTitle>
            <CardDescription className="text-cream/60">
              All information is confidential and used only for your diagnosis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cream">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualRevenue" className="text-cream">
                  Annual Revenue ($) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  required
                  placeholder="1000000"
                  value={formData.annualRevenue || ''}
                  onChange={(e) => handleNumberChange('annualRevenue', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses" className="text-cream">
                  Monthly Expenses ($) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  required
                  placeholder="50000"
                  value={formData.monthlyExpenses || ''}
                  onChange={(e) => handleNumberChange('monthlyExpenses', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cac" className="text-cream">
                  Customer Acquisition Cost - CAC ($) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="cac"
                  type="number"
                  required
                  placeholder="500"
                  value={formData.cac || ''}
                  onChange={(e) => handleNumberChange('cac', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ltv" className="text-cream">
                  Customer Lifetime Value - LTV ($) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="ltv"
                  type="number"
                  required
                  placeholder="2000"
                  value={formData.ltv || ''}
                  onChange={(e) => handleNumberChange('ltv', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="churnRate" className="text-cream">
                  Monthly Churn Rate (%) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="churnRate"
                  type="number"
                  step="0.1"
                  required
                  placeholder="5.5"
                  value={formData.churnRate || ''}
                  onChange={(e) => handleNumberChange('churnRate', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageDealSize" className="text-cream">
                  Average Deal Size ($) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="averageDealSize"
                  type="number"
                  required
                  placeholder="1500"
                  value={formData.averageDealSize || ''}
                  onChange={(e) => handleNumberChange('averageDealSize', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesCycleLength" className="text-cream">
                  Sales Cycle Length (days) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="salesCycleLength"
                  type="number"
                  required
                  placeholder="30"
                  value={formData.salesCycleLength || ''}
                  onChange={(e) => handleNumberChange('salesCycleLength', e.target.value)}
                  className="bg-navy/60 border-cream/30 text-cream placeholder:text-cream/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-cream">
                  Industry <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  required
                >
                  <SelectTrigger id="industry" className="bg-navy/60 border-cream/30 text-cream">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy border-cream/30">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry} className="text-cream focus:bg-cream/10 focus:text-cream">
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              )}
                <div className="mb-6 rounded-2xl border border-yellow-300/40 bg-yellow-300/10 p-4 text-yellow-100">
                  <p className="font-semibold">Diagnostic service is temporarily unavailable.</p>
                  <p className="text-sm text-yellow-100/80">
                    The deployment is missing Supabase configuration. Please set <code>VITE_SUPABASE_URL</code> and{' '}
                    <code>VITE_SUPABASE_ANON_KEY</code> in production, then reload the page.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cream text-navy hover:bg-cream/90 text-lg py-6 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Your Business...
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
