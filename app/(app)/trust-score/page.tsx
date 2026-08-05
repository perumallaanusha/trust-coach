import Link from 'next/link'
import {
  ArrowUpRight,
  BadgeCheck,
  FileCheck2,
  Fingerprint,
  Info,
  Lock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { PageHeader } from '@/components/app-shell'
import { TrendChart } from '@/components/app-widgets'
import { Meter, TrustRing } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { trustFactors, weeklyProgress } from '@/lib/data'

export const metadata = {
  title: 'Trust Score',
  description:
    'See how your TrustCoach Trust Score is calculated and what raises it.',
}

const verifications = [
  {
    icon: Fingerprint,
    label: 'Government ID',
    status: 'Verified',
    detail: 'Checked 12 Jun 2026',
    done: true,
  },
  {
    icon: FileCheck2,
    label: 'Student enrolment',
    status: 'Verified',
    detail: 'University email confirmed',
    done: true,
  },
  {
    icon: Lock,
    label: 'Payment method',
    status: 'Verified',
    detail: 'Visa ending 4242',
    done: true,
  },
  {
    icon: BadgeCheck,
    label: 'Reference check',
    status: 'Pending',
    detail: 'Add one academic reference for +5 points',
    done: false,
  },
]

export default function TrustScorePage() {
  const total = trustFactors.reduce((sum, f) => sum + f.points, 0)
  const max = trustFactors.reduce((sum, f) => sum + f.max, 0)

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Trust Score"
        description="A single number built from verified identity, real session history and authentic reviews. Coaches see yours, and you see theirs."
      >
        <Button variant="outline" className="h-10 rounded-xl px-4">
          <Info className="size-4" />
          How scoring works
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card className="h-fit items-center gap-0 rounded-2xl border-border/80 p-6 text-center">
          <TrustRing score={total} size={168} />
          <p className="mt-4 flex items-center gap-1.5 font-display text-lg font-semibold text-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Highly trusted
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            You score higher than 91% of students on the platform.
          </p>
          <span className="mt-4 flex items-center gap-1 rounded-full bg-[var(--success)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--success)]">
            <ArrowUpRight className="size-3.5" />
            +6 points this week
          </span>
          <div className="mt-6 w-full rounded-2xl bg-muted/50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next milestone
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              Reach 90 to unlock priority booking with top-rated coaches.
            </p>
            <Meter value={(total / 90) * 100} className="mt-3" label="Progress to 90" />
            <p className="mt-2 text-xs text-muted-foreground">
              {90 - total} points to go
            </p>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Score breakdown
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {total} of {max} available points earned
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary">
                <TrendingUp className="size-3.5" />
                Recalculated daily
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {trustFactors.map((factor) => (
                <div key={factor.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-foreground">{factor.label}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {factor.points}
                      <span className="text-muted-foreground">/{factor.max}</span>
                    </p>
                  </div>
                  <Meter
                    value={(factor.points / factor.max) * 100}
                    label={factor.label}
                    tone={
                      factor.points / factor.max >= 0.8
                        ? 'success'
                        : factor.points / factor.max >= 0.5
                          ? 'primary'
                          : 'warning'
                    }
                    className="mt-2"
                  />
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {factor.detail}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Score over time
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Last seven weeks
            </p>
            <div className="mt-5">
              <TrendChart data={weeklyProgress} />
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-6 gap-0 rounded-2xl border-border/80 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Verifications
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each completed check permanently adds to your score.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {verifications.map((item) => (
            <div
              key={item.label}
              className={
                item.done
                  ? 'flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-4'
                  : 'flex flex-col gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4'
              }
            >
              <span
                className={
                  item.done
                    ? 'flex size-10 items-center justify-center rounded-xl bg-[var(--success)]/10 text-[var(--success)]'
                    : 'flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'
                }
              >
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              {item.done ? (
                <span className="mt-auto w-fit rounded-full bg-[var(--success)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--success)]">
                  {item.status}
                </span>
              ) : (
                <Button
                  variant="outline"
                  className="mt-auto h-9 rounded-xl"
                  render={<Link href="/settings" />}
                >
                  Complete check
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
