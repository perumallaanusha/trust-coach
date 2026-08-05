import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BadgeCheck,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Languages,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Meter, StarRating, TrustRing } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { coaches, reviews, trustFactors } from '@/lib/data'

export function generateStaticParams() {
  return coaches.map((coach) => ({ id: coach.id }))
}

export default async function CoachProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const coach = coaches.find((c) => c.id === id)
  if (!coach) notFound()

  const coachReviews = reviews.filter((r) => r.coach === coach.name)
  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/coaches"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to search
      </Link>

      <Card className="mt-4 gap-0 overflow-hidden rounded-2xl border-border/80 p-0">
        <div className="flex flex-col gap-6 border-b border-border p-6 md:flex-row md:items-start md:p-8">
          <Avatar className="size-24 rounded-3xl">
            <AvatarImage src={coach.avatar} alt={coach.name} />
            <AvatarFallback>{coach.name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {coach.name}
              </h1>
              {coach.verified && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <BadgeCheck className="size-3.5" />
                  ID verified
                </span>
              )}
              {coach.topRated && (
                <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  <Sparkles className="size-3.5" />
                  Top rated
                </span>
              )}
            </div>
            <p className="mt-1 text-muted-foreground">{coach.title}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <StarRating rating={coach.rating} showValue />
                <span>({coach.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {coach.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Languages className="size-4" />
                {coach.languages.join(', ')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                Replies {coach.responseTime}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-foreground">
              {coach.bio}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                className="h-11 rounded-xl px-5"
                render={<Link href={`/book?coach=${coach.id}`} />}
              >
                <CalendarPlus className="size-4" />
                Book from ${coach.price}
              </Button>
              <Button variant="outline" className="h-11 rounded-xl px-5">
                <MessageSquare className="size-4" />
                Message
              </Button>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2 rounded-2xl bg-muted/50 p-5">
            <TrustRing score={coach.trustScore} size={116} />
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Trust Score
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {[
            { label: 'Sessions coached', value: coach.sessions.toLocaleString() },
            { label: 'Average rating', value: coach.rating.toFixed(1) },
            { label: 'Verified reviews', value: coach.reviewCount },
            { label: 'Per session', value: `$${coach.price}` },
          ].map((stat) => (
            <div key={stat.label} className="border-b border-border p-5 md:border-b-0">
              <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1.5 font-display text-2xl font-bold text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              What we work on
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {coach.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                'A written plan after the first session, revised as you progress',
                'Homework between sessions with direct feedback, not generic advice',
                'Session notes and recordings stored in your TrustCoach account',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Verified reviews
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                render={<Link href="/reviews" />}
              >
                See all
              </Button>
            </div>
            <div className="mt-4 flex flex-col divide-y divide-border">
              {(coachReviews.length > 0 ? coachReviews : reviews.slice(0, 2)).map(
                (review) => (
                  <article key={review.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {review.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.role} · {review.date}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-3 font-display text-sm font-semibold text-foreground">
                      {review.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {review.body}
                    </p>
                  </article>
                ),
              )}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="h-fit gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Weekly availability
            </h2>
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {allDays.map((day) => {
                const open = coach.availability.includes(day)
                return (
                  <div
                    key={day}
                    className={
                      open
                        ? 'flex flex-col items-center gap-1 rounded-xl bg-primary/10 py-2.5 text-primary'
                        : 'flex flex-col items-center gap-1 rounded-xl bg-muted py-2.5 text-muted-foreground'
                    }
                  >
                    <span className="text-[11px] font-semibold uppercase">
                      {day.slice(0, 1)}
                    </span>
                    <span className="text-[10px]">{open ? 'Open' : '—'}</span>
                  </div>
                )
              })}
            </div>
            <Button
              className="mt-5 h-11 w-full rounded-xl"
              render={<Link href={`/book?coach=${coach.id}`} />}
            >
              Pick a time
            </Button>
          </Card>

          <Card className="h-fit gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              How this score is built
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {trustFactors.slice(0, 4).map((factor) => (
                <div key={factor.label}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {factor.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {factor.points}/{factor.max}
                    </p>
                  </div>
                  <Meter
                    value={(factor.points / factor.max) * 100}
                    label={factor.label}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
