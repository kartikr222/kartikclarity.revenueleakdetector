import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

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

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-4">What You Get</h2>
            <p className="max-w-3xl mx-auto text-cream/75 text-lg leading-relaxed">
              Everything you need to diagnose revenue leaks, prioritize the highest-impact fixes, and execute with a clear implementation roadmap.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-[2rem] border border-cream/15 bg-navy/40 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.18)] xl:col-span-1">
              <h3 className="text-xl font-semibold text-cream mb-4">Platform Access</h3>
              <ul className="space-y-2 text-cream/75 text-sm leading-relaxed">
                <li>• Revenue Intelligence OS™ platform access</li>
                <li>• Executive client dashboard</li>
                <li>• Dedicated private workspace</li>
                <li>• Guided onboarding portal</li>
                <li>• Priority support and private community</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-cream/15 bg-navy/40 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.18)] xl:col-span-1">
              <h3 className="text-xl font-semibold text-cream mb-4">Executive Frameworks</h3>
              <ul className="space-y-2 text-cream/75 text-sm leading-relaxed">
                <li>• Revenue Leak Assessment™</li>
                <li>• Executive diagnostic reports</li>
                <li>• Revenue scorecards and health checks</li>
                <li>• 30 / 60 / 90-day execution roadmaps</li>
                <li>• Executive implementation templates</li>
                <li>• Data collection and analysis frameworks</li>
                <li>• Notion operating workspace</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-cream/15 bg-navy/40 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.18)] xl:col-span-1">
              <h3 className="text-xl font-semibold text-cream mb-4">Templates, Playbooks &amp; Assets</h3>
              <ul className="space-y-2 text-cream/75 text-sm leading-relaxed">
                <li>• Sales and follow-up templates</li>
                <li>• Handoff and onboarding playbooks</li>
                <li>• Proposal and implementation templates</li>
                <li>• Executive presentation templates</li>
                <li>• Decision-making frameworks</li>
                <li>• Continuously updated operating resources</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-cream/15 bg-navy/40 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.18)] xl:col-span-1">
              <h3 className="text-xl font-semibold text-cream mb-4">Integrations &amp; Delivery</h3>
              <ul className="space-y-2 text-cream/75 text-sm leading-relaxed">
                <li>• GitHub access (where applicable)</li>
                <li>• Discord / Telegram access (where applicable)</li>
                <li>• Connected business tools and systems</li>
                <li>• Client-specific workspace permissions</li>
                <li>• Custom implementation configuration during onboarding</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-cream/15 bg-navy/40 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.18)] xl:col-span-1">
              <h3 className="text-xl font-semibold text-cream mb-4">Licensing</h3>
              <ul className="space-y-2 text-cream/75 text-sm leading-relaxed">
                <li>• Revenue Intelligence OS™ license</li>
                <li>• AI-assisted diagnostic capabilities</li>
                <li>• Client-specific feature configuration</li>
                <li>• Usage limits based on your plan</li>
                <li>• Ongoing platform improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-cream/15 bg-navy/70 p-8 sm:p-12 shadow-[0_35px_80px_rgba(0,0,0,0.25)]">
          <div className="mb-6">
            <p className="text-cream/80 text-sm uppercase tracking-[0.22em] mb-3">Enterprise Delivery</p>
            <p className="text-cream/75 text-lg leading-relaxed">
              Immediately after purchase, you’ll receive secure access to the platform and all included digital assets.
            </p>
          </div>

          <p className="text-cream/75 text-lg leading-relaxed mb-6">
            Your client-specific workspace, integrations, configurations, connected systems, and implementation deliverables are provisioned during onboarding based on your engagement.
          </p>

          <p className="text-2xl sm:text-3xl font-semibold text-cream leading-relaxed tracking-tight">
            <strong>One platform. One diagnosis. One execution system.</strong>
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-cream/15 bg-navy/70 p-8 sm:p-12 shadow-[0_35px_80px_rgba(0,0,0,0.25)]">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream mb-6">Revenue Intelligence OS™</h2>

          <h3 className="text-2xl sm:text-3xl font-semibold text-cream mb-5 leading-tight">
            Diagnose the constraint before you invest another dollar trying to fix it.
          </h3>

          <p className="text-cream/75 text-lg leading-relaxed mb-5">
            Revenue Intelligence OS™ is an executive revenue diagnosis platform for B2B SaaS companies generating <strong>$5M–$50M ARR</strong>.
          </p>

          <p className="text-cream/75 text-lg leading-relaxed mb-5">
            It helps founders, CEOs, CROs, and revenue leaders identify exactly where revenue is being lost across the entire commercial engine—from demand generation and pipeline to sales, onboarding, expansion, and retention.
          </p>

          <p className="text-cream/75 text-lg leading-relaxed mb-6">
            Instead of relying on assumptions, disconnected dashboards, or more software, the platform gives leadership teams a complete revenue diagnosis powered by proprietary frameworks, executive scorecards, AI-assisted analysis, implementation playbooks, and actionable roadmaps.
          </p>

          <p className="text-2xl font-semibold text-cream mb-4 leading-relaxed">
            <strong>Know what’s leaking. Know what to fix first. Execute with confidence.</strong>
          </p>

          <blockquote className="border-l-2 border-cream/30 pl-4 text-xl text-cream/90 italic leading-relaxed">
            Diagnose the constraint. Prioritize the leak. Execute with clarity.
          </blockquote>
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
