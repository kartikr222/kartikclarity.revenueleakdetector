import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LeakCategory } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { AlertCircle, TrendingDown } from 'lucide-react'

interface LeakCardProps {
  category: LeakCategory
  index: number
}

export default function LeakCard({ category, index }: LeakCardProps) {
  const impactLevel = category.impact_usd > 100000 ? 'High' : category.impact_usd > 50000 ? 'Medium' : 'Low'
  const impactColor = impactLevel === 'High' ? 'destructive' : impactLevel === 'Medium' ? 'default' : 'secondary'

  return (
    <Card className="bg-navy/40 border-cream/20 hover:border-cream/40 transition-all duration-300 hover:shadow-lg animate-slide-up">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center text-cream font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <CardTitle className="text-cream text-xl leading-snug">{category.name}</CardTitle>
            </div>
            <CardDescription className="text-cream/70">{category.description}</CardDescription>
          </div>
          <AlertCircle className="w-6 h-6 text-cream/40 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-cream/5 rounded-lg border border-cream/10">
          <TrendingDown className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-cream/60 mb-1">Estimated Annual Impact</div>
            <div className="text-2xl font-bold text-cream tabular-nums">{formatCurrency(category.impact_usd)}</div>
          </div>
          <Badge variant={impactColor}>{impactLevel}</Badge>
        </div>
        <Separator className="bg-cream/10" />
        <div>
          <h4 className="text-sm font-semibold text-cream mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-cream/60 rounded-full"></span>
            Recommended Actions
          </h4>
          <ul className="space-y-2">
            {category.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-cream/80">
                <span className="text-cream/40 mt-1 flex-shrink-0">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
