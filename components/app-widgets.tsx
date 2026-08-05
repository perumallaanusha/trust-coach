import Link from 'next/link'
import { ArrowUpRight, Clock, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Session } from '@/lib/data'

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string
  delta?: string
  hint?: string
}) {
  return (
    <Card className="gap-0 rounded-2xl border-border/80 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        {delta && (
          <span className="flex items-center gap-1 rounded-full bg-[var(--success)]/10 px-2 py-1 text-xs font-semibold text-[var(--success)]">
            <ArrowUpRight className="size-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-foreground">
        {value}
      </p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
      {hint && (
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </Card>
  )
}

export function SessionRow({
  session,
  action = 'join',
}: {
  session: Session
  action?: 'join' | 'review' | 'confirm'
}) {
  const statusStyles: Record<Session['status'], string> = {
    upcoming: 'bg-primary/10 text-primary',
    completed: 'bg-muted text-muted-foreground',
    pending: 'bg-[var(--success)]/10 text-[var(--success)]',
  }

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
      <Avatar className="size-11 rounded-xl">
        <AvatarImage src={session.avatar} alt={session.coach} />
        <AvatarFallback>{session.coach.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{session.topic}</p>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {session.coach} · {session.mode}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
        <p className="text-sm font-medium text-foreground">{session.date}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {session.time} · {session.duration}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:ml-4">
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
            statusStyles[session.status],
          )}
        >
          {session.status}
        </span>
        {action === 'join' && (
          <Button className="h-9 rounded-xl px-3">
            <Video className="size-4" />
            Join
          </Button>
        )}
        {action === 'review' && (
          <Button
            variant="outline"
            className="h-9 rounded-xl px-3"
            render={<Link href="/reviews" />}
          >
            Review
          </Button>
        )}
        {action === 'confirm' && (
          <Button className="h-9 rounded-xl px-3">Confirm</Button>
        )}
      </div>
    </div>
  )
}

export function BarChart({
  data,
  unit = 'h',
}: {
  data: { week: string; hours: number }[]
  unit?: string
}) {
  const max = Math.max(...data.map((d) => d.hours))
  return (
    <div className="flex h-44 items-end gap-2 sm:gap-3">
      {data.map((point) => (
        <div
          key={point.week}
          className="flex h-full flex-1 flex-col items-center justify-end gap-2"
        >
          <span className="text-xs font-medium text-muted-foreground">
            {point.hours}
            {unit}
          </span>
          <div
            className="w-full rounded-t-lg bg-primary/85 transition-all hover:bg-primary"
            style={{ height: `${(point.hours / max) * 100}%` }}
            title={`${point.week}: ${point.hours}${unit}`}
          />
          <span className="text-xs text-muted-foreground">{point.week}</span>
        </div>
      ))}
    </div>
  )
}

export function TrendChart({
  data,
  height = 180,
}: {
  data: { week: string; score: number }[]
  height?: number
}) {
  const width = 640
  const min = Math.min(...data.map((d) => d.score)) - 6
  const max = Math.max(...data.map((d) => d.score)) + 4
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d.score - min) / (max - min)) * (height - 20) - 10
    return { x, y, ...d }
  })
  const line = points.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `0,${height} ${line} ${width},${height}`

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-44 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Trust Score trend over the last seven weeks"
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--primary)"
              stopOpacity="0.22"
            />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#trend-fill)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p) => (
          <circle
            key={p.week}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--background)"
            stroke="var(--primary)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <span key={d.week} className="text-xs text-muted-foreground">
            {d.week}
          </span>
        ))}
      </div>
    </div>
  )
}
