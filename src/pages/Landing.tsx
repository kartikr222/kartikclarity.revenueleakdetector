import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, TrendingUp, DollarSign, Shield } from 'lucide-react'

const calendlyUrl = 'https://calendly.com/kartikmraviraj/30min'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/10 px-4 py-2 text-sm text-cream/80 ring-1 ring-cream/10">
              Premium revenue intelligence for founders and growth teams
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-cream leading-tight">
                Find Your Hidden
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cream to-cream/70">
                  Revenue Leaks
                </span>
              </h1>
            </div>

            <p className="max-w-2xl text-lg sm:text-xl text-cream/75 leading-relaxed">
              AI-powered diagnosis that reveals where your business is leaking revenue and gives you a clear, prioritized plan to recover it fast.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/diagnose" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-cream text-navy hover:bg-cream/90 px-8 py-5 shadow-[0_25px_55px_rgba(232,213,181,0.18)] transition-all duration-300"
                >
                  Start Free Diagnosis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-cream/20 bg-navy/80 px-8 py-5 text-center text-cream font-semibold shadow-[0_16px_36px_rgba(0,0,0,0.2)] hover:border-cream/30 hover:bg-navy/95 transition"
              >
                📅 Book a Free Strategy Call
              </a>
            </div>

            <div className="rounded-[2rem] border border-cream/10 bg-navy/40 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.2)]">
              <p className="text-cream/75 text-sm sm:text-base leading-relaxed">
                Results in 60 seconds · No credit card required · Strategic insights you can act on today.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cream/15 bg-[#0d1229] p-4 shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
            <img
              src="/assets/cover-banner.svg"
              alt="Kartik Clarity revenue leak diagnosis banner"
              className="w-full h-auto rounded-[1.5rem] border border-cream/10 bg-navy/95"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: BarChart3,
              title: 'Comprehensive Analysis',
              description: 'Deep dive into 8 critical business metrics to uncover inefficiencies',
            },
            {
              icon: TrendingUp,
              title: 'AI-Powered Insights',
              description: 'Gemini 2.0 analyzes patterns invisible to traditional audits',
            },
            {
              icon: DollarSign,
              title: 'Quantified Impact',
              description: 'See exactly how much each leak costs you annually in dollars',
            },
            {
              icon: Shield,
              title: 'Actionable Roadmap',
              description: 'Get specific, prioritized recommendations you can implement today',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-navy/40 border border-cream/20 rounded-3xl p-6 hover:border-cream/40 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] h-full"
            >
              <feature.icon className="w-10 h-10 text-cream mb-4" />
              <h3 className="text-cream font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-cream/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-navy/40 border border-cream/20 rounded-[2rem] p-8 sm:p-12 shadow-[0_24px_55px_rgba(0,0,0,0.2)]">
            <p className="text-cream/80 text-lg italic mb-4 leading-relaxed">
              Most businesses are losing 15 to 30 percent of potential revenue to preventable leaks.
              The ones who find and fix them first win the market.
            </p>
            <p className="text-cream font-semibold">— Kartik Clarity™ Research Team</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="rounded-[2rem] border border-cream/15 bg-navy/70 p-10 text-center shadow-[0_35px_80px_rgba(0,0,0,0.25)]">
          <p className="text-cream/70 text-sm uppercase tracking-[0.22em] mb-4">Ready to uncover hidden revenue leaks?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-6">
            Book your free 30-minute strategy session.
          </h2>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cream to-[#F6E7C7] px-8 py-5 text-navy font-semibold shadow-[0_22px_55px_rgba(232,213,181,0.22)] hover:shadow-[0_28px_65px_rgba(232,213,181,0.28)] transition"
          >
            📅 Book Your Free Strategy Session
          </a>
        </div>
      </section>
    </div>
  )
}
