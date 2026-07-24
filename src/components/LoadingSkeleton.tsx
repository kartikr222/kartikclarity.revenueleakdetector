import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-[#22233d] py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 max-w-full mx-auto" />
        </div>
        <div className="flex justify-center mb-12">
          <Skeleton className="w-48 h-48 rounded-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-navy/40 border-cream/20">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
