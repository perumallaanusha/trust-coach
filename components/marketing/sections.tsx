import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  LineChart,
  MessageSquareQuote,
  Quote,
  Search,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { SectionLabel, StarRating } from '@/components/primitives'
import { CoachCard } from '@/components/coach-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { coaches, reviews, trustFactors } from '@/lib/data'

const features = [
  {
    icon: ShieldCheck,
    title: 'Trust Score on every profile',
    body: 'A single 0–100 number built from verified identity, attendance history, review authenticity and dispute record.',
  },
  {
    icon: Search,
    title: 'Search that filters noise',
    body: 'Filter by skill, price, language and availability. Unverified profiles never rank above verified ones.',
  },
  {
    icon: CalendarCheck,
    title: 'Booking with real availability',
    body: 'Pick a slot from a live calendar, pay once, and get reminders on both sides. No back-and-forth threads.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Reviews tied to paid sessions',
    body: 'Only students who attended and paid can review. Coaches can reply once, publicly, and never delete.',
  },
  {
    icon: LineChart,
    title: 'Progress you can see',
    body: 'Every session feeds a skill graph so students know what improved and what is still stuck.',
  },
  {
    icon: Target,
    title: 'Goals with deadlines',
    body: 'Break outcomes into milestones. Coaches see the same board, so sessions start with context.',
  },
]

const steps = [
  {
    step: 'Step 1',
    title: 'Tell us the outcome',
    body: 'Pick your goal — portfolio, interviews, speaking — and the level you are starting from.',
  },
  {
    step: 'Step 2',
    title: 'Compare verified coaches',
    body: 'Read Trust Score breakdowns, session-backed reviews and pricing before you commit a cent.',
  },
  {
    step: 'Step 3',
    title: 'Book, work, measure',
    body: 'Sessions, notes and milestones live in one dashboard so progress is never a feeling.',
  },
]

export function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-2xl">
        <SectionLabel>Platform</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          Everything a coaching relationship needs, and nothing it does not
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Students stop gambling on strangers. Coaches stop proving themselves
          from scratch on every call.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="gap-0 rounded-2xl border-border/80 p-6 transition-colors hover:border-primary/30"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <feature.icon className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.body}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
              From uncertain to booked in three steps
            </h2>
          </div>
          <Button
            variant="outline"
            className="h-11 w-fit rounded-xl px-5"
            render={<Link href="/coaches" />}
          >
            Browse coaches
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.title}>
              <Card className="h-full gap-0 rounded-2xl border-border/80 bg-background p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {step.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function TrustSection() {
  return (
    <section id="trust" className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionLabel>Trust Score</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            A score you can audit, line by line
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Ratings alone are easy to game. TrustCoach publishes the full
            breakdown behind every number, recalculated after each session, for
            students and coaches alike.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              'Identity and credential checks, not self-reported bios',
              'Attendance and cancellation history from real bookings',
              'Reviews locked to completed, paid sessions',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            className="mt-8 h-11 rounded-xl px-5"
            render={<Link href="/trust-score" />}
          >
            See a full breakdown
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <Card className="gap-0 rounded-3xl border-border/70 p-6 shadow-lg shadow-primary/5 md:p-8">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Score composition
            </p>
            <p className="font-display text-3xl font-bold text-primary">82</p>
          </div>
          <div className="mt-6 flex flex-col divide-y divide-border">
            {trustFactors.map((factor) => (
              <div
                key={factor.label}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {factor.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {factor.detail}
                  </p>
                </div>
                <p className="shrink-0 font-display text-sm font-bold text-foreground">
                  {factor.points}
                  <span className="text-muted-foreground">/{factor.max}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export function FeaturedCoaches() {
  return (
    <section id="coaches" className="border-y border-border bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Coaches</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
              Verified coaches, ranked by evidence
            </h2>
          </div>
          <Button
            variant="outline"
            className="h-11 w-fit rounded-xl px-5"
            render={<Link href="/coaches" />}
          >
            Search all coaches
            <Search className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-2xl">
        <SectionLabel>Outcomes</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
          Reviews written after the work, not before
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {reviews.slice(0, 3).map((review) => (
          <Card
            key={review.id}
            className="gap-0 rounded-2xl border-border/80 p-6"
          >
            <Quote className="size-6 text-primary/40" aria-hidden="true" />
            <p className="mt-4 font-display text-base font-semibold text-foreground">
              {review.title}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <Avatar className="size-9">
                <AvatarFallback>{review.author.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {review.author}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {review.role}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

const plans = [
  {
    name: 'Starter',
    price: '$0',
    note: 'For students getting oriented',
    features: [
      'Browse verified coaches',
      'Trust Score breakdowns',
      '1 goal, 1 progress board',
    ],
    cta: 'Create account',
    href: '/login/student',
    highlighted: false,
  },
  {
    name: 'Student Pro',
    price: '$14',
    note: 'per month, cancel anytime',
    features: [
      'Unlimited goals and milestones',
      'Session notes and recordings',
      'Priority booking windows',
      'Progress reports for scholarships',
    ],
    cta: 'Start free trial',
    href: '/login/student',
    highlighted: true,
  },
  {
    name: 'Coach',
    price: '8%',
    note: 'per completed session',
    features: [
      'Verified profile and badge',
      'Calendar, payouts, invoicing',
      'Trust Score analytics',
      'Client roster and notes',
    ],
    cta: 'Apply as coach',
    href: '/login/coach',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Simple pricing, no lock-in
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? 'relative gap-0 rounded-2xl border-primary/40 bg-background p-6 shadow-xl shadow-primary/10 lg:-mt-4 lg:mb-4'
                  : 'gap-0 rounded-2xl border-border/80 bg-background p-6'
              }
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-4 font-display text-4xl font-bold text-foreground">
                {plan.price}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.note}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? 'default' : 'outline'}
                className="mt-8 h-11 w-full rounded-xl"
                render={<Link href={plan.href} />}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClosingCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Card className="relative gap-0 overflow-hidden rounded-3xl border-none bg-primary p-8 text-primary-foreground md:p-14">
        <div
          className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full bg-primary-foreground/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Stop guessing who to learn from
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/80">
            Join 12,000 students and 850 verified coaches already working inside
            TrustCoach.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="secondary"
              className="h-12 rounded-xl px-6 text-base"
              render={<Link href="/login/student" />}
            >
              Get started free
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-12 rounded-xl border border-primary-foreground/30 px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<Link href="/coach" />}
            >
              See the coach dashboard
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}

export function SiteFooter() {
  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Search coaches', href: '/coaches' },
        { label: 'Trust Score', href: '/trust-score' },
        { label: 'Progress tracker', href: '/progress' },
        { label: 'Goals', href: '/goals' },
      ],
    },
    {
      title: 'For coaches',
      links: [
        { label: 'Coach dashboard', href: '/coach' },
        { label: 'Coach login', href: '/login/coach' },
        { label: 'Reviews policy', href: '/reviews' },
        { label: 'Settings', href: '/settings' },
      ],
    },
    {
      title: 'Students',
      links: [
        { label: 'Student dashboard', href: '/student' },
        { label: 'Student login', href: '/login/student' },
        { label: 'Book a session', href: '/book' },
        { label: 'Notifications', href: '/notifications' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-6">
        <div className="max-w-xs">
          <p className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            Trust<span className="-ml-2.5 text-primary">Coach</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Verified coaching marketplace with transparent trust signals and
            measurable student progress.
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Bell className="size-3.5" />
            Product updates every other Tuesday
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-foreground">
              {column.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>© 2026 TrustCoach Labs. All rights reserved.</p>
          <p>Privacy · Terms · Trust &amp; Safety</p>
        </div>
      </div>
    </footer>
  )
}
