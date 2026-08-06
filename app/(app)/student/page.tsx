import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  Flame,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { PageHeader } from '@/components/app-shell'
import { BarChart, SessionRow, StatCard } from '@/components/app-widgets'
import { CoachCard } from '@/components/coach-card'
import { Meter, TrustRing } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { coaches, goals, sessions, weeklyProgress } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Student dashboard â€” TrustCoach',
}

export default function StudentDashboardPage() {
  const upcoming = sessions.filter((s) => s.status === 'upcoming')
  const completed = sessions.filter((s) => s.status === 'completed')

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Good evening, Priya"
        description="Two sessions this week and one milestone left before your 31 August portfolio deadline."
      >
        <Button
          variant="outline"
          className="h-10 rounded-xl px-4" asChild
        ><Link href="/goals">
          View goals
        </Link></Button>
        <Button className="h-10 rounded-xl px-4" asChild><Link href="/book">
          Book a session
        </Link></Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarCheck}
          label="Sessions completed"
          value="12"
          delta="+3 this month"
          hint="Next: Thursday 13 August, 4:30 PM"
        />
        <StatCard
          icon={Clock3}
          label="Coaching hours"
          value="18.5"
          delta="+6h"
          hint="Averaging 2.6 hours per week"
        />
        <StatCard
          icon={Target}
          label="Goals on track"
          value="2 of 3"
          hint="Public speaking goal needs attention"
        />
        <StatCard
          icon={Flame}
          label="Weekly streak"
          value="7 weeks"
          delta="Best yet"
          hint="Consistency adds points to your Trust Score"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Upcoming sessions
              </h2>
              <p className="text-sm text-muted-foreground">
                Confirmed and paid. Reminders go out 24 hours ahead.
              </p>
            </div>
            <Button
              variant="ghost"
              className="h-9 rounded-xl px-3" asChild
            ><Link href="/book">
              All
              <ArrowRight className="size-4" />
            </Link></Button>
          </div>
          <div className="mt-2 flex flex-col divide-y divide-border">
            {upcoming.map((session) => (
              <SessionRow key={session.id} session={session} />
            ))}
            {completed.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                action="review"
              />
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card className="items-center gap-0 rounded-2xl border-border/80 p-6 text-center">
            <TrustRing score={82} size={132} />
            <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
              Your Trust Score
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Up 6 points this week from verified ID and session attendance.
            </p>
            <Button
              variant="outline"
              className="mt-5 h-10 w-full rounded-xl" asChild
            ><Link href="/trust-score">
              <ShieldCheck className="size-4" />
              See breakdown
            </Link></Button>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Goal progress
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {goals.map((goal) => (
                <div key={goal.id}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="truncate font-medium text-foreground">
                      {goal.title}
                    </span>
                    <span className="shrink-0 text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <Meter
                    value={goal.progress}
                    label={goal.title}
                    tone={goal.status === 'At risk' ? 'warning' : 'primary'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Weekly coaching hours
          </h2>
          <p className="text-sm text-muted-foreground">Last seven weeks</p>
          <div className="mt-6">
            <BarChart data={weeklyProgress} />
          </div>
        </Card>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Recommended for your goals
              </h2>
              <p className="text-sm text-muted-foreground">
                Matched on skills, availability and Trust Score
              </p>
            </div>
            <Button
              variant="ghost"
              className="h-9 rounded-xl px-3" asChild
            ><Link href="/coaches">
              Search
              <ArrowRight className="size-4" />
            </Link></Button>
          </div>
          <div className="grid gap-5">
            {coaches.slice(0, 2).map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
