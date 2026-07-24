import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <Logo className="w-24 h-24 mx-auto mb-8 opacity-50" />

        <h1 className="text-6xl sm:text-7xl font-bold text-cream mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-cream mb-4">Page Not Found</h2>
        <p className="text-cream/70 text-lg mb-8">
          Looks like this page leaked away. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-cream text-navy hover:bg-cream/90 w-full sm:w-auto">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-cream/30 text-cream hover:bg-cream/10 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
