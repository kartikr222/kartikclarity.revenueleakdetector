import { useEffect, useState } from 'react'

interface ScoreCircleProps {
  score: number
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const clampedScore = Math.min(100, Math.max(0, score))

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const increment = Math.max(clampedScore, 1) / 50
      const interval = setInterval(() => {
        current += increment
        if (current >= clampedScore) {
          setDisplayScore(clampedScore)
          clearInterval(interval)
        } else {
          setDisplayScore(Math.floor(current))
        }
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [clampedScore])

  const getColor = (s: number) => {
    if (s >= 80) return '#22c55e'
    if (s >= 60) return '#eab308'
    if (s >= 40) return '#f97316'
    return '#ef4444'
  }

  const getLabel = (s: number) => {
    if (s >= 80) return 'Excellent'
    if (s >= 60) return 'Good'
    if (s >= 40) return 'Needs Attention'
    return 'Critical'
  }

  const color = getColor(clampedScore)
  const circumference = 2 * Math.PI * 70
  const offset = circumference - (displayScore / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48 animate-pulse-glow rounded-full">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 192 192">
          <circle cx="96" cy="96" r="70" stroke="#2A2A3E" strokeWidth="12" fill="none" />
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-cream tabular-nums">{displayScore}</div>
          <div className="text-sm text-cream/60 mt-1">/ 100</div>
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-semibold text-cream mb-1">Revenue Health Score</div>
        <div
          className="text-sm font-semibold px-4 py-1.5 rounded-full inline-block"
          style={{ backgroundColor: color + '22', color }}
        >
          {getLabel(clampedScore)}
        </div>
      </div>
    </div>
  )
}
