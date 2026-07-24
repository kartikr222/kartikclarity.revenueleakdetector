import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Logo from './Logo'

const calendlyUrl = 'https://calendly.com/kartikmraviraj/30min'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-navy/95 backdrop-blur-2xl">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3 transition duration-300 hover:opacity-90">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 ring-1 ring-cream/15 transition-transform duration-300 hover:scale-[1.03]">
            <Logo className="w-10 h-10" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-cream font-semibold text-base">
              Kartik Clarity<span className="text-cream/70">™</span>
            </span>
            <span className="text-cream/60 text-xs">Revenue Leak Diagnosis</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-3 md:flex">
            <Link to="/diagnose" className="text-cream/80 hover:text-cream text-sm font-medium transition-colors">
              Diagnose
            </Link>
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-cream to-[#F6E7C7] text-navy shadow-[0_18px_45px_rgba(232,213,181,0.18)] hover:shadow-[0_22px_55px_rgba(232,213,181,0.24)] tracking-wide"
              >
                📅 Book a Free Strategy Call
              </Button>
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-navy/80 text-cream transition hover:bg-navy/100 sm:hidden"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${menuOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 pb-4">
          <div className="flex flex-col gap-3 rounded-3xl border border-cream/10 bg-navy/95 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.18)]">
            <Link
              to="/diagnose"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-cream/10 bg-cream/5 px-4 py-3 text-cream hover:bg-cream/10 transition"
            >
              Diagnose
            </Link>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cream to-[#F6E7C7] px-4 py-3 text-center text-navy font-semibold shadow-[0_18px_45px_rgba(232,213,181,0.18)] hover:shadow-[0_22px_55px_rgba(232,213,181,0.24)]"
            >
              📅 Book a Free Strategy Call
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
