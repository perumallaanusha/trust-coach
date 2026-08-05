import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  DollarSign,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react'
import { PageHeader } from '@/components/app-shell'
import { SessionRow, StatCard, TrendChart } from '@/components/app-widgets'
import { Meter, StarRating, TrustRing } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { reviews, sessions, weeklyProgress } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Coach dashboard — TrustCoach',
}

const roster = [
  {
    name: 'Priya Nair',
    focus: 'Portfolio case studies',
    avatar: '/coaches/lena.png',
    progress: 75,
    next: 'Thu 13 Aug',
  },
  {
    name: 'Marcus Tan',
    focus: 'Case interview drills',
    avatar: '/coaches/daniel.png',
    progress: 48,
    next: 'Sat 15 Aug',
  },
  {
    name: 'Aisha Kalu',
    focus: 'Conference talk prep',
    avatar: '/coaches/sofia.png',
    progress: 22,
    next: 'Mon 18 Aug',
  },
]

const availability = [
  { day: 'Mon', slots: 3, booked: 3 },
  { day: 'Tue', slots: 4, booked: 2 },
  { day: 'Wed', slots: 4, booked: 4 },
  { day: 'Thu', slots: 5, booked: 3 },
  { day: 'Fri', slots: 3, booked: 1 },
  { day: 'Sat', slots: 2, booked: 0 },
  { day: 'Sun', slots: 0, booked: 0 },
]

export default function CoachDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Coach workspace"
        description="Aarav Mehta · Senior Product Design Coach. Three sessions scheduled this week and two review replies pending."
      >
        <Button
          variant="outline"
          className="h-10 rounded-xl px-4"
          render={<Link href="/settings" />}
        >
          Edit availability
        </Button>
        <Button
          className="h-10 rounded-xl px-4"
          render={<Link href="/coaches/aarav-mehta" />}
        >
          View public profile
        </Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Earnings this month"
          value="$2,184"
          delta="+18%"
          hint="Next payout Friday, 14 August"
        />
        <StatCard
          icon={Users}
          label="Active students"
          value="14"
          delta="+2"
          hint="3 new enquiries awaiting reply"
        />
        <StatCard
          icon={CalendarDays}
          label="Sessions this week"
          value="9"
          hint="1 slot still open on Friday"
        />
        <StatCard
          icon={Star}
          label="Average rating"
          value="4.9"
          delta="+0.1"
          hint="From 214 session-verified reviews"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Trust Score trend
              </h2>
              <p className="text-sm text-muted-foreground">
                Recalculated after every completed session
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 text-sm font-semibold text-primary">
              <BadgeCheck className="size-4" />
              96
            </span>
          </div>
          <div className="mt-6">
            <TrendChart data={weeklyProgress} />
          </div>
        </Card>

        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            This week&apos;s availability
          </h2>
          <p className="text-sm text-muted-foreground">
            Booked slots versus published slots
          </p>
          <div className="mt-5 flex flex-col gap-3.5">
            {availability.map((row) => (
              <div key={row.day} className="flex items-center gap-3">
                <span className="w-9 text-sm font-medium text-muted-foreground">
                  {row.day}
                </span>
                <Meter
                  value={row.slots ? (row.booked / row.slots) * 100 : 0}
                  label={`${row.day} bookings`}
                  className="flex-1"
                  tone={
                    row.slots && row.booked === row.slots ? 'success' : 'primary'
                  }
                />
                <span className="w-10 text-right text-xs text-muted-foreground">
                  {row.booked}/{row.slots}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Today and next up
            </h2>
            <Button
              variant="ghost"
              className="h-9 rounded-xl px-3"
              render={<Link href="/book" />}
            >
              Calendar
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-col divide-y divide-border">
            {sessions.slice(0, 2).map((session) => (
              <SessionRow key={session.id} session={session} />
            ))}
            <SessionRow
              session={{ ...sessions[2], status: 'pending' }}
              action="confirm"
            />
          </div>
        </Card>

        <Card className="items-center gap-0 rounded-2xl border-border/80 p-6 text-center">
          <TrustRing score={96} size={132} />
          <p className="mt-4 font-display text-lg font-semibold text-foreground">
            Top 3% of coaches
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Verified identity, 98% attendance and zero disputes in the last 90
            days.
          </p>
          <Button
            variant="outline"
            className="mt-5 h-10 w-full rounded-xl"
            render={<Link href="/trust-score" />}
          >
            Improve my score
          </Button>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Student roster
          </h2>
          <div className="mt-4 flex flex-col divide-y divide-border">
            {roster.map((student) => (
              <div
                key={student.name}
                className="flex items-center gap-3 py-3.5"
              >
                <Avatar className="size-10 rounded-xl">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {student.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {student.focus} · next {student.next}
                  </p>
                  <Meter
                    value={student.progress}
                    label={`${student.name} progress`}
                    className="mt-2 h-1.5"
                  />
                </div>
                <span className="shrink-0 text-sm font-medium text-muted-foreground">
                  {student.progress}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Reviews awaiting reply
            </h2>
            <Button
              variant="ghost"
              className="h-9 rounded-xl px-3"
              render={<Link href="/reviews" />}
            >
              All
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-col divide-y divide-border">
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {review.author}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {review.body}
                </p>
                <Button
                  variant="outline"
                  className="mt-3 h-9 rounded-xl px-3"
                  render={<Link href="/reviews" />}
                >
                  <MessageSquare className="size-4" />
                  Reply publicly
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
