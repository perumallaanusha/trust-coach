'use client'

import { useState } from 'react'
import { CalendarDays, Check, Plus, Target, X } from 'lucide-react'
import { Meter } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { goals as seedGoals } from '@/lib/data'

type Goal = (typeof seedGoals)[number]

export function GoalsBoard() {
  const [goals, setGoals] = useState<Goal[]>(seedGoals)
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')

  const recalc = (steps: Goal['steps']) =>
    Math.round((steps.filter((s) => s.done).length / steps.length) * 100)

  const toggleStep = (goalId: string, stepLabel: string) =>
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal
        const steps = goal.steps.map((step) =>
          step.label === stepLabel ? { ...step, done: !step.done } : step,
        )
        return { ...goal, steps, progress: recalc(steps) }
      }),
    )

  const addGoal = () => {
    if (title.trim().length < 3) return
    setGoals((prev) => [
      {
        id: `g${prev.length + 1}-${Date.now()}`,
        title: title.trim(),
        category: 'Custom',
        due: due.trim() || 'No date set',
        progress: 0,
        status: 'On track',
        steps: [{ label: 'Define first milestone with your coach', done: false }],
      },
      ...prev,
    ])
    setTitle('')
    setDue('')
    setAdding(false)
  }

  const completedSteps = goals.reduce(
    (sum, goal) => sum + goal.steps.filter((s) => s.done).length,
    0,
  )
  const allSteps = goals.reduce((sum, goal) => sum + goal.steps.length, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Active goals', value: `${goals.length}` },
          { label: 'Milestones done', value: `${completedSteps} of ${allSteps}` },
          {
            label: 'At risk',
            value: `${goals.filter((g) => g.status === 'At risk').length}`,
          },
        ].map((stat) => (
          <Card key={stat.label} className="gap-0 rounded-2xl border-border/80 p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {adding ? (
        <Card className="gap-0 rounded-2xl border-primary/30 bg-primary/[0.03] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">
              New goal
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg"
              onClick={() => setAdding(false)}
            >
              <X className="size-4" />
              Cancel
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_200px]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="goal-title">Goal</Label>
              <Input
                id="goal-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Land three interviews by December"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="goal-due">Target date</Label>
              <Input
                id="goal-due"
                value={due}
                onChange={(event) => setDue(event.target.value)}
                placeholder="30 Nov 2026"
                className="h-11 rounded-xl"
              />
            </div>
          </div>
          <Button
            className="mt-5 h-11 self-start rounded-xl px-6"
            onClick={addGoal}
            disabled={title.trim().length < 3}
          >
            Add goal
          </Button>
        </Card>
      ) : (
        <Button
          variant="outline"
          className="h-12 justify-center rounded-2xl border-dashed"
          onClick={() => setAdding(true)}
        >
          <Plus className="size-4" />
          Add a goal
        </Button>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.id} className="gap-0 rounded-2xl border-border/80 p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  <Target className="size-3.5" />
                  {goal.category}
                </span>
                <h3 className="mt-2.5 text-pretty font-display text-lg font-semibold leading-snug text-foreground">
                  {goal.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  Due {goal.due}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold',
                  goal.status === 'On track'
                    ? 'bg-[var(--success)]/10 text-[var(--success)]'
                    : 'bg-destructive/10 text-destructive',
                )}
              >
                {goal.status}
              </span>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="font-display text-sm font-bold text-foreground">
                  {goal.progress}%
                </p>
              </div>
              <Meter
                value={goal.progress}
                label={goal.title}
                tone={goal.status === 'On track' ? 'primary' : 'warning'}
                className="mt-2"
              />
            </div>

            <ul className="mt-5 flex flex-col gap-1 border-t border-border pt-4">
              {goal.steps.map((step) => (
                <li key={step.label}>
                  <button
                    type="button"
                    onClick={() => toggleStep(goal.id, step.label)}
                    aria-pressed={step.done}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                        step.done
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background',
                      )}
                    >
                      {step.done && <Check className="size-3.5" />}
                    </span>
                    <span
                      className={cn(
                        'text-sm',
                        step.done
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground',
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}
