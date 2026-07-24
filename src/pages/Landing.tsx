import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, TrendingUp, DollarSign, Shield } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8">
            <Logo className="w-20 h-20" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-cream mb-6 leading-tight tracking-tight">
            Find Your Hidden
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cream to-cream/60">
              Revenue Leaks
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-cream/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered diagnosis that reveals where your business is losing money — and exactly how to fix it.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Link to="/diagnose">
              <Button
                size="lg"
                className="bg-cream text-navy hover:bg-cream/90 text-lg px-8 py-6 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Free Diagnosis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="text-cream/60 text-sm">
              Results in 60 seconds &middot; No credit card required
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: BarChart3, title: 'Comprehensive Analysis', description: 'Deep dive into 8 critical business metrics to uncover inefficiencies' },
            { icon: TrendingUp, title: 'AI-Powered Insights', description: 'Gemini 2.0 analyzes patterns invisible to traditional audits' },
            { icon: DollarSign, title: 'Quantified Impact', description: 'See exactly how much each leak costs you annually in dollars' },
            { icon: Shield, title: 'Actionable Roadmap', description: 'Get specific, prioritized recommendations you can implement today' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-navy/40 border border-cream/20 rounded-lg p-6 hover:border-cream/40 transition-all duration-300 hover:shadow-lg h-full"
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
          <div className="bg-navy/40 border border-cream/20 rounded-lg p-8">
            <p className="text-cream/80 text-lg italic mb-4 leading-relaxed">
              Most businesses are losing 15 to 30 percent of potential revenue to preventable leaks.
              The ones who find and fix them first win the market.
            </p>
            <p className="text-cream font-semibold">— Kartik Clarity™ Research Team</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-cream/10 to-cream/5 border border-cream/20 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-cream mb-4">Ready to Stop the Leak?</h2>
          <p className="text-cream/70 text-lg mb-8">
            Join the founders who have already found the exact stage where their revenue leaks out.
          </p>
          <Link to="/diagnose">
            <Button size="lg" className="bg-cream text-navy hover:bg-cream/90 text-lg px-8 py-6 rounded-lg font-semibold">
              Get Your Free Score Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-8 border-t border-cream/10">
        <div className="text-center text-cream/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Kartik Clarity™. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
