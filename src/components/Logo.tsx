interface LogoProps {
  className?: string
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kartik Clarity logo"
    >
      <rect width="100" height="100" fill="#1A1A2E" rx="22" />

      {/* The revenue leak visualization: line that dips then ascends */}
      <path
        d="M 15 38 L 30 38 L 45 66 L 60 32 L 75 20"
        stroke="#E8D5B5"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow pointing up (the "fix") */}
      <path
        d="M 75 20 L 67 24 M 75 20 L 79 29"
        stroke="#E8D5B5"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Leak drop indicator */}
      <circle cx="45" cy="66" r="4" fill="#E8D5B5" opacity="0.65" />
      <circle cx="15" cy="38" r="4" fill="#E8D5B5" />

      {/* Bottom accent line */}
      <line x1="18" y1="82" x2="82" y2="82" stroke="#E8D5B5" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
    </svg>
  )
}
