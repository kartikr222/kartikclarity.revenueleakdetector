import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiagnosis } from '@/context/DiagnosisContext'
import ScoreCircle from '@/components/ScoreCircle'
import LeakCard from '@/components/LeakCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Download } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function Report() {
  const navigate = useNavigate()
  const { result, input } = useDiagnosis()

  useEffect(() => {
    if (!result) {
      navigate('/diagnose')
    }
  }, [result, navigate])

  if (!result) {
    return <LoadingSkeleton />
  }

  const totalImpact = result.categories.reduce((sum, cat) => sum + cat.impact_usd, 0)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4">
            Your Revenue Leak Diagnosis
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Based on your business metrics, we identified {result.categories.length} key areas
            where you are losing approximately{' '}
            <span className="text-cream font-semibold">{formatCurrency(totalImpact)}</span> annually.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <ScoreCircle score={result.score} />
        </div>

        {result.summary && (
          <div className="mb-12 bg-navy/40 border border-cream/20 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-cream mb-4">Executive Summary</h2>
            <p className="text-cream/80 leading-relaxed">{result.summary}</p>
          </div>
        )}

        <Separator className="bg-cream/20 mb-12" />

        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-8 text-center">
            Revenue Leak Categories
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {result.categories.map((category, index) => (
              <LeakCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>

        <Separator className="bg-cream/20 mb-12" />

        <div className="bg-gradient-to-r from-cream/10 to-cream/5 border border-cream/20 rounded-2xl p-8 md:p-12 text-center no-print">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">Ready to Plug These Leaks?</h2>
          <p className="text-cream/70 text-lg mb-8 max-w-2xl mx-auto">
            Book a free 30-minute strategy call to get a personalized action plan
            and start recovering your lost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cream text-navy hover:bg-cream/90 text-lg px-8 py-6"
              onClick={() => window.open('https://calendly.com/kartikmraviraj/30min', '_blank')}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Book Free Strategy Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cream/30 text-cream hover:bg-cream/10 text-lg px-8 py-6"
              onClick={() => window.print()}
            >
              <Download className="mr-2 w-5 h-5" />
              Download Report
            </Button>
          </div>
        </div>

        {input && (
          <div className="mt-8 text-center text-cream/40 text-sm">
            <p>
              Report generated for {input.industry} business with ${input.annualRevenue.toLocaleString()} annual revenue
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
