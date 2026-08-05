import {
  CalendarCheck,
  Clock,
  Flame,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { PageHeader } from '@/components/app-shell'
import { BarChart, StatCard, TrendChart } from '@/components/app-widgets'
import { Meter } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { skillProgress, weeklyProgress } from '@/lib/data'

export const metadata = {
  title: 'Progress tracker',
  description:
    'Track coaching hours, skill growth and Trust Score movement week by week.',
}

const milestones = [
  {
    week: 'Week 33',
    title: 'Third case study approved',
    detail: 'Aarav signed off on the design system audit write-up.',
  },
  {
    week: 'Week 31',
    title: 'First clean mock interview',
    detail: 'Scored 8/10 on structure with Lena. No prompts needed.',
  },
  {
    week: 'Week 29',
    title: 'Trust Score crossed 68',
    detail: 'Identity verification and four completed sessions.',
  },
  {
    week: 'Week 27',
    title: 'Started coaching',
    detail: 'Baseline assessment across five skill areas.',
  },
]

export default function ProgressPage() {
  const totalHours = weeklyProgress.reduce((sum, w) => sum + w.hours, 0)
  const latest = weeklyProgress[weeklyProgress.length - 1]
  const first = weeklyProgress[0]

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Progress tracker"
        description="Seven weeks of coaching, measured. Hours logged, skills moving, and how each of those feeds your Trust Score."
      >
        <Button variant="outline" className="h-10 rounded-xl px-4">
          Export report
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Clock}
          label="Coaching hours logged"
          value={`${totalHours}h`}
          delta="+6h"
          hint="Across 13 sessions with 4 coaches"
        />
        <StatCard
          icon={ShieldCheck}
          label="Trust Score now"
          value={`${latest.score}`}
          delta={`+${latest.score - first.score}`}
          hint="Up from 58 in week 27"
        />
        <StatCard
          icon={Flame}
          label="Current streak"
          value="7 weeks"
          hint="At least one session every week"
        />
        <StatCard
          icon={Target}
          label="Goals on track"
          value="2 of 3"
          hint="One goal flagged at risk"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Hours per week
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Time spent in coaching sessions
          </p>
          <div className="mt-6">
            <BarChart data={weeklyProgress} />
          </div>
        </Card>

        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Trust Score trend
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Weekly recalculation
          </p>
          <div className="mt-6">
            <TrendChart data={weeklyProgress} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Skill assessment
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scored by your coaches after each session
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {skillProgress.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-foreground">{skill.skill}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {skill.value}
                    <span className="text-muted-foreground">/100</span>
                  </p>
                </div>
                <Meter
                  value={skill.value}
                  label={skill.skill}
                  tone={
                    skill.value >= 75
                      ? 'success'
                      : skill.value >= 55
                        ? 'primary'
                        : 'warning'
                  }
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-fit gap-0 rounded-2xl border-border/80 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <CalendarCheck className="size-4 text-primary" />
            Milestones
          </h2>
          <ol className="mt-5 flex flex-col">
            {milestones.map((milestone, index) => (
              <li key={milestone.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
                  {index < milestones.length - 1 && (
                    <span className="w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {milestone.week}
                  </p>
                  <p className="mt-1 font-medium text-foreground">
                    {milestone.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {milestone.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}
