import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  size = 'sm',
  showValue = false,
  className,
}: {
  rating: number
  size?: 'sm' | 'md'
  showValue?: boolean
  className?: string
}) {
  const px = size === 'sm' ? 'size-3.5' : 'size-4'
  return (
    <span className={cn('flex items-center gap-1', className)}>
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(
              px,
              i <= Math.round(rating)
                ? 'fill-primary text-primary'
                : 'fill-border text-border',
            )}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  )
}

export function Meter({
  value,
  className,
  tone = 'primary',
  label,
}: {
  value: number
  className?: string
  tone?: 'primary' | 'success' | 'warning'
  label?: string
}) {
  const tones = {
    primary: 'bg-primary',
    success: 'bg-[var(--success)]',
    warning: 'bg-destructive/80',
  }
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full transition-all', tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function TrustRing({
  score,
  size = 132,
  label = 'Trust Score',
}: {
  score: number
  size?: number
  label?: string
}) {
  const stroke = size > 110 ? 10 : 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${score} out of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-secondary"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="stroke-primary"
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold leading-none text-foreground">
          {score}
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          / 100
        </span>
      </span>
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
      {children}
    </span>
  )
}
