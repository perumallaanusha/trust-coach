'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Video,
} from 'lucide-react'
import { StarRating } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { coaches } from '@/lib/data'

const days = [
  { date: '11', day: 'Mon', open: true },
  { date: '12', day: 'Tue', open: true },
  { date: '13', day: 'Wed', open: true },
  { date: '14', day: 'Thu', open: false },
  { date: '15', day: 'Fri', open: true },
  { date: '16', day: 'Sat', open: true },
  { date: '17', day: 'Sun', open: false },
]

const slots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:30 PM', '6:00 PM']

const lengths = [
  { value: '30', label: '30 min', multiplier: 0.6 },
  { value: '50', label: '50 min', multiplier: 1 },
  { value: '80', label: '80 min', multiplier: 1.5 },
]

const steps = ['Coach', 'Time', 'Confirm']

export function BookingFlow({ initialCoachId }: { initialCoachId?: string }) {
  const [step, setStep] = useState(0)
  const [coachId, setCoachId] = useState(initialCoachId ?? coaches[0].id)
  const [day, setDay] = useState('13')
  const [slot, setSlot] = useState('4:30 PM')
  const [length, setLength] = useState('50')
  const [notes, setNotes] = useState('')
  const [booked, setBooked] = useState(false)

  const coach = coaches.find((c) => c.id === coachId) ?? coaches[0]
  const multiplier =
    lengths.find((l) => l.value === length)?.multiplier ?? 1
  const subtotal = Math.round(coach.price * multiplier)
  const platformFee = Math.round(subtotal * 0.08)
  const total = subtotal + platformFee

  if (booked) {
    return (
      <Card className="mx-auto max-w-lg items-center gap-0 rounded-2xl border-border/80 p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CalendarCheck className="size-7" />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-foreground">
          Session confirmed
        </h2>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {coach.name} will meet you on Thursday {day} August at {slot}. The
          video link and calendar invite are in your notifications.
        </p>
        <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
          <Button
            className="h-11 flex-1 rounded-xl"
            render={<Link href="/student" />}
          >
            Go to dashboard
          </Button>
          <Button
            variant="outline"
            className="h-11 flex-1 rounded-xl"
            onClick={() => {
              setBooked(false)
              setStep(0)
            }}
          >
            Book another
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-6">
        <ol className="flex items-center gap-2">
          {steps.map((label, index) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(index)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  index === step
                    ? 'border-primary bg-primary/8 text-primary'
                    : index < step
                      ? 'border-border bg-background text-foreground'
                      : 'border-border bg-background text-muted-foreground',
                )}
                aria-current={index === step ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                    index <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {index < step ? <CheckCircle2 className="size-3.5" /> : index + 1}
                </span>
                <span className="truncate">{label}</span>
              </button>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Choose your coach
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Only verified coaches with a Trust Score above 80 are shown.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {coaches.map((option) => {
                const active = option.id === coachId
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setCoachId(option.id)}
                    aria-pressed={active}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors',
                      active
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/40',
                    )}
                  >
                    <Avatar className="size-12 rounded-xl">
                      <AvatarImage src={option.avatar} alt="" />
                      <AvatarFallback>{option.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate font-semibold text-foreground">
                          {option.name}
                        </span>
                        <BadgeCheck className="size-4 shrink-0 text-primary" />
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">
                        {option.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <StarRating rating={option.rating} />
                        <span className="text-xs text-muted-foreground">
                          Trust {option.trustScore}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-base font-bold text-foreground">
                      ${option.price}
                    </span>
                  </button>
                )
              })}
            </div>
            <Button
              className="mt-6 h-11 self-start rounded-xl px-6"
              onClick={() => setStep(1)}
            >
              Continue
            </Button>
          </Card>
        )}

        {step === 1 && (
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Pick a date and time
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              August 2026 · times shown in your local timezone (GMT+5:30)
            </p>

            <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {days.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  disabled={!d.open}
                  onClick={() => setDay(d.date)}
                  aria-pressed={day === d.date}
                  className={cn(
                    'flex flex-col items-center gap-0.5 rounded-xl border py-3 transition-colors',
                    !d.open
                      ? 'cursor-not-allowed border-border bg-muted/60 text-muted-foreground/50'
                      : day === d.date
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/40',
                  )}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    {d.day}
                  </span>
                  <span className="font-display text-lg font-bold leading-none">
                    {d.date}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Label>Available slots</Label>
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    aria-pressed={slot === s}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-colors',
                      slot === s
                        ? 'border-primary bg-primary/8 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                    )}
                  >
                    <Clock className="size-3.5" />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Label>Session length</Label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {lengths.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLength(l.value)}
                    aria-pressed={length === l.value}
                    className={cn(
                      'rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
                      length === l.value
                        ? 'border-primary bg-primary/8 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground',
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                className="h-11 rounded-xl px-5"
                onClick={() => setStep(0)}
              >
                Back
              </Button>
              <Button
                className="h-11 rounded-xl px-6"
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Confirm and pay
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Funds are held until the session is completed. Cancel free up to
              12 hours before.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              <Label htmlFor="notes">What do you want to cover?</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Share context, links or the exact problem you are stuck on."
                className="rounded-xl"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CreditCard className="size-4 text-primary" />
                Payment method
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Visa ending 4242 · billed after the session is confirmed
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                className="h-11 rounded-xl px-5"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="h-11 rounded-xl px-6"
                onClick={() => setBooked(true)}
              >
                Confirm booking · ${total}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Card className="h-fit gap-0 rounded-2xl border-border/80 p-6 lg:sticky lg:top-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Summary
        </p>

        <div className="mt-4 flex items-center gap-3">
          <Avatar className="size-12 rounded-xl">
            <AvatarImage src={coach.avatar} alt="" />
            <AvatarFallback>{coach.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">
              {coach.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              Trust Score {coach.trustScore}
            </p>
          </div>
        </div>

        <dl className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Date</dt>
            <dd className="font-medium text-foreground">{day} Aug 2026</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Time</dt>
            <dd className="font-medium text-foreground">{slot}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Length</dt>
            <dd className="font-medium text-foreground">{length} min</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Format</dt>
            <dd className="flex items-center gap-1.5 font-medium text-foreground">
              <Video className="size-3.5" />
              Video call
            </dd>
          </div>
        </dl>

        <dl className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Session</dt>
            <dd className="font-medium text-foreground">${subtotal}.00</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Platform fee</dt>
            <dd className="font-medium text-foreground">${platformFee}.00</dd>
          </div>
          <div className="flex justify-between gap-2 border-t border-border pt-3">
            <dt className="font-semibold text-foreground">Total</dt>
            <dd className="font-display text-lg font-bold text-foreground">
              ${total}.00
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
