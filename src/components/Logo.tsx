interface LogoProps {
  className?: string
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <img src="/assets/logo.svg" className={className} alt="Kartik Clarity logo" />
  )
}
