import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Meter, StarRating, TrustRing } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const stats = [
  { value: '12,400+', label: 'Verified sessions' },
  { value: '4.9/5', label: 'Average coach rating' },
  { value: '96%', label: 'Show-up rate' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid opacity-70" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Trust Score 2.0 is live for every coach
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Coaching you can{' '}
            <span className="relative whitespace-nowrap text-primary">
              verify
              <svg
                className="absolute -bottom-1.5 left-0 h-3 w-full text-primary/30"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C40 3 90 2 198 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , not guess.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            TrustCoach scores every coach on identity, attendance and review
            authenticity — then gives students booking, goals and progress
            tracking in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-12 rounded-xl px-6 text-base"
              render={<Link href="/login/student" />}
            >
              Find a coach
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl px-6 text-base"
              render={<Link href="/login/coach" />}
            >
              Coach with us
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <Card className="relative z-10 gap-0 rounded-3xl border-border/70 p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center gap-5">
              <TrustRing score={96} size={124} />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Trust Score
                </p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  Aarav Mehta
                </p>
                <p className="text-sm text-muted-foreground">
                  Senior Product Design Coach
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary">
                  <BadgeCheck className="size-3.5" />
                  ID + credentials verified
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-muted/60 p-4">
              {[
                { label: 'Attendance reliability', value: 98 },
                { label: 'Review authenticity', value: 94 },
                { label: 'Response speed', value: 89 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {row.label}
                    </span>
                    <span className="text-muted-foreground">{row.value}%</span>
                  </div>
                  <Meter value={row.value} label={row.label} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="absolute -bottom-8 -left-2 z-20 hidden w-64 gap-0 rounded-2xl border-border/70 p-4 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarCheck className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Session confirmed
                </p>
                <p className="text-xs text-muted-foreground">
                  Thu 13 Aug · 4:30 PM
                </p>
              </div>
            </div>
          </Card>

          <Card className="absolute -right-2 -top-6 z-20 hidden w-60 gap-0 rounded-2xl border-border/70 p-4 shadow-lg sm:block">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 rounded-xl">
                <AvatarImage src="/coaches/sofia.png" alt="Sofia Rossi" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Sofia Rossi
                </p>
                <StarRating rating={4.9} showValue />
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[var(--success)]">
              <TrendingUp className="size-3.5" />
              Trust Score up 4 this month
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
