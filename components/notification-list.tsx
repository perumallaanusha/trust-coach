'use client'

import { useState } from 'react'
import {
  BellOff,
  CalendarCheck,
  CheckCheck,
  CreditCard,
  ShieldCheck,
  Star,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { notifications as seed } from '@/lib/data'

type Item = (typeof seed)[number]

const icons: Record<Item['type'], LucideIcon> = {
  session: CalendarCheck,
  trust: ShieldCheck,
  review: Star,
  goal: Target,
  payment: CreditCard,
}

const filters = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'session', label: 'Sessions' },
  { value: 'trust', label: 'Trust' },
] as const

export function NotificationList() {
  const [items, setItems] = useState<Item[]>(seed)
  const [filter, setFilter] = useState<(typeof filters)[number]['value']>('all')

  const unread = items.filter((item) => item.unread).length
  const visible = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'unread') return item.unread
    return item.type === filter
  })

  const markAll = () =>
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })))

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item,
      ),
    )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-background p-1">
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                filter === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {option.label}
              {option.value === 'unread' && unread > 0 && (
                <span className="ml-1.5 text-xs">({unread})</span>
              )}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          className="h-10 rounded-xl px-4"
          onClick={markAll}
          disabled={unread === 0}
        >
          <CheckCheck className="size-4" />
          Mark all read
        </Button>
      </div>

      {visible.length > 0 ? (
        <div className="mt-5 flex flex-col gap-3">
          {visible.map((item) => {
            const Icon = icons[item.type]
            return (
              <Card
                key={item.id}
                className={cn(
                  'gap-0 rounded-2xl p-5 transition-colors',
                  item.unread
                    ? 'border-primary/25 bg-primary/[0.035]'
                    : 'border-border/80',
                )}
              >
                <div className="flex gap-4">
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-xl',
                      item.unread
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="mt-3 text-xs font-semibold text-primary transition-opacity hover:opacity-70"
                    >
                      {item.unread ? 'Mark as read' : 'Mark as unread'}
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="mt-5 items-center gap-0 rounded-2xl border-dashed p-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <BellOff className="size-5" />
          </span>
          <p className="mt-4 font-display text-lg font-semibold text-foreground">
            Nothing here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            You are all caught up on this filter.
          </p>
        </Card>
      )}
    </div>
  )
}
