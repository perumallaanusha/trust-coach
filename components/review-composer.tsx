'use client'

import { useState } from 'react'
import { CheckCircle2, PenLine, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { sessions } from '@/lib/data'

export function ReviewComposer() {
  const completed = sessions.filter((s) => s.status === 'completed')
  const [sessionId, setSessionId] = useState(completed[0]?.id ?? '')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const valid = rating > 0 && title.trim().length > 2 && body.trim().length > 9

  if (submitted) {
    return (
      <Card className="items-center gap-0 rounded-2xl border-border/80 p-8 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--success)]/10 text-[var(--success)]">
          <CheckCircle2 className="size-6" />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          Review published
        </p>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
          It is marked verified because it is tied to a completed, paid session.
          Your coach can reply but cannot remove it.
        </p>
        <Button
          variant="outline"
          className="mt-5 h-10 rounded-xl px-4"
          onClick={() => {
            setSubmitted(false)
            setRating(0)
            setTitle('')
            setBody('')
          }}
        >
          Write another
        </Button>
      </Card>
    )
  }

  return (
    <Card className="gap-0 rounded-2xl border-border/80 p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <PenLine className="size-4 text-primary" />
        Write a review
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Only sessions you attended and paid for can be reviewed.
      </p>

      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          if (valid) setSubmitted(true)
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="session">Session</Label>
          <select
            id="session"
            value={sessionId}
            onChange={(event) => setSessionId(event.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            {completed.map((session) => (
              <option key={session.id} value={session.id}>
                {session.coach} — {session.topic} ({session.date})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Rating</Label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${value} star${value > 1 ? 's' : ''}`}
                aria-pressed={rating === value}
                className="rounded-lg p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'size-7',
                    value <= (hover || rating)
                      ? 'fill-primary text-primary'
                      : 'fill-secondary text-border',
                  )}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {rating} of 5
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="review-title">Headline</Label>
          <Input
            id="review-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Sum it up in one line"
            className="h-11 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="review-body">Your experience</Label>
          <Textarea
            id="review-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={5}
            placeholder="What changed after the session? Be specific — vague reviews get less weight in the Trust Score."
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            {body.trim().length} characters · minimum 10
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Published under your verified name
          </p>
          <Button type="submit" disabled={!valid} className="h-11 rounded-xl px-6">
            Publish review
          </Button>
        </div>
      </form>
    </Card>
  )
}
