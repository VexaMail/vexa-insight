import type { PublicScoreProps } from '../../types/public-check/PublicScoreProps'
import { publicScoreColor } from './publicScoreColor'

export function PublicScoreGauge({ score }: Readonly<PublicScoreProps>) {
  const circumference = 2 * Math.PI * 48
  return (
    <div
      className={`relative size-36 shrink-0 ${publicScoreColor(score.value)}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="opacity-10"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - (score.value ?? 0) / 100)}
        />
      </svg>
      <p className="absolute inset-0 flex flex-col items-center justify-center">
        <strong className="font-mono text-4xl font-semibold">
          {score.value ?? '—'}
        </strong>
        <span className="text-muted-foreground text-xs">out of 100</span>
      </p>
    </div>
  )
}
