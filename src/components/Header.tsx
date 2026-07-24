import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Logo from './Logo'

export default function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="border-b border-cream/10 bg-navy/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo className="w-10 h-10 flex-shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="text-cream font-bold text-lg leading-tight">
              Kartik Clarity<span className="text-cream/70">™</span>
            </span>
            <span className="text-cream/60 text-xs leading-tight">Revenue Leak Diagnosis</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          {!isHomePage && (
            <Link
              to="/diagnose"
              className="text-cream/80 hover:text-cream text-sm font-medium transition-colors hidden sm:inline-block"
            >
              Diagnose
            </Link>
          )}
          <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-cream text-navy hover:bg-cream/90 font-semibold">
              Book a Call
            </Button>
          </a>
        </nav>
      </div>
    </header>
  )
}
