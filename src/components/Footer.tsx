export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-navy/90 text-cream/70">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <img src="/assets/cover-banner.svg" alt="Kartik Clarity marketing banner" className="h-14 w-auto rounded-2xl border border-cream/10 bg-navy/95 object-contain" />
          <p className="max-w-xl text-center text-sm leading-relaxed sm:text-left sm:max-w-md">
            Premium revenue leak diagnostics for ambitious founders. Fast, clear, and actionable.
          </p>
        </div>

        <div className="text-center text-sm sm:text-right">
          <p className="font-medium text-cream">Kartik Clarity™</p>
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
