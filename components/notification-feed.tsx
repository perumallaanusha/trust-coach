'use client'

import { useMemo, useState } from 'react'
import {
  BellOff,
  CalendarCheck,
  CheckCheck,
  CreditCard,
  Goal,
  ShieldCheck,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export type NotificationItem = {
  id: string
  type: 'booking' | 'payment' | 'review' | 'trust_score' | 'goal' | 'system'
  title: string
  body: string
  href: string | null
  readAt: string | null
  createdAt: string
}

const icons: Record<NotificationItem['type'], LucideIcon> = {
  booking: CalendarCheck,
  payment: CreditCard,
  review: Star,
  trust_score: ShieldCheck,
  goal: Goal,
  system: ShieldCheck,
}

const filters = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'booking', label: 'Sessions' },
  { value: 'trust_score', label: 'Trust' },
] as const

function formatTime(value: string) {
  const date = new Date(value)
  const elapsed = Date.now() - date.getTime()
  const minutes = Math.max(1, Math.floor(elapsed / 60_000))

  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function NotificationFeed({ initialItems }: { initialItems: NotificationItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [filter, setFilter] = useState<(typeof filters)[number]['value']>('all')
  const [saving, setSaving] = useState(false)

  const unread = items.filter((item) => !item.readAt).length
  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (filter === 'all') return true
        if (filter === 'unread') return !item.readAt
        return item.type === filter
      }),
    [filter, items],
  )

  async function setReadState(id: string, read: boolean) {
    const readAt = read ? new Date().toISOString() : null
    const previous = items
    setItems((current) => current.map((item) => (item.id === id ? { ...item, readAt } : item)))

    const { error } = await createClient()
      .from('notifications')
      .update({ read_at: readAt })
      .eq('id', id)

    if (error) setItems(previous)
  }

  async function markAllRead() {
    if (!unread) return
    setSaving(true)
    const readAt = new Date().toISOString()
    const previous = items
    setItems((current) => current.map((item) => ({ ...item, readAt: item.readAt ?? readAt })))

    const { error } = await createClient()
      .from('notifications')
      .update({ read_at: readAt })
      .is('read_at', null)

    if (error) setItems(previous)
    setSaving(false)
  }

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
              {option.value === 'unread' && unread > 0 && <span className="ml-1.5 text-xs">({unread})</span>}
            </button>
          ))}
        </div>
        <Button variant="outline" className="h-10 rounded-xl px-4" onClick={markAllRead} disabled={!unread || saving}>
          <CheckCheck className="size-4" />
          Mark all read
        </Button>
      </div>

      {visible.length ? (
        <div className="mt-5 flex flex-col gap-3">
          {visible.map((item) => {
            const Icon = icons[item.type]
            const isUnread = !item.readAt

            return (
              <Card
                key={item.id}
                className={cn(
                  'gap-0 rounded-2xl p-5 transition-colors',
                  isUnread ? 'border-primary/25 bg-primary/[0.035]' : 'border-border/80',
                )}
              >
                <div className="flex gap-4">
                  <span className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-xl',
                    isUnread ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}>
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(item.createdAt)}</p>
                    </div>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    <button
                      type="button"
                      onClick={() => setReadState(item.id, !isUnread)}
                      className="mt-3 text-xs font-semibold text-primary transition-opacity hover:opacity-70"
                    >
                      {isUnread ? 'Mark as read' : 'Mark as unread'}
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
          <p className="mt-4 font-display text-lg font-semibold text-foreground">Nothing here</p>
          <p className="mt-1 text-sm text-muted-foreground">You are all caught up on this filter.</p>
        </Card>
      )}
    </div>
  )
}
