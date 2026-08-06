'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BadgeCheck, Clock, MapPin, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { StarRating } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getPublicCoaches, type PublicCoach } from '@/lib/coach-directory'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'trust', label: 'Trust Score' },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Lowest price' },
] as const

function formatMoney(amountInCents: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amountInCents / 100)
}

function CoachResultCard({ coach }: { coach: PublicCoach }) {
  const responseTime = coach.responseTimeHours
    ? `under ${coach.responseTimeHours}h`
    : 'Response time unavailable'

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border-border/80 p-0 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start gap-4 p-5">
        <Avatar className="size-14 rounded-2xl">
          <AvatarImage src={coach.avatarUrl ?? '/placeholder-user.jpg'} alt={coach.fullName} />
          <AvatarFallback>{coach.fullName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-base font-semibold text-foreground">{coach.fullName}</h3>
            <BadgeCheck className="size-4 shrink-0 text-primary" aria-label="Verified coach" />
          </div>
          <p className="truncate text-sm text-muted-foreground">{coach.headline || 'Verified coach'}</p>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={coach.rating} showValue />
            <span className="text-xs text-muted-foreground">({coach.reviewCount})</span>
          </div>
        </div>
        <div className="hidden shrink-0 flex-col items-end sm:flex">
          <span className="flex items-center gap-1 rounded-full bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" />
            {coach.trustScore}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-5">
        {coach.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="size-3.5" />{coach.location ?? 'Remote'}</span>
        <span className="flex items-center gap-1"><Clock className="size-3.5" />Replies {responseTime}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border bg-muted/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-lg font-bold text-foreground">{formatMoney(coach.hourlyRateCents, coach.currency)}</span> / session
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 rounded-xl px-3" asChild><Link href={`/coaches/${coach.id}`}>Profile</Link></Button>
          <Button className="h-9 rounded-xl px-3" asChild><Link href={`/book?coach=${coach.id}`}>Book</Link></Button>
        </div>
      </div>
    </Card>
  )
}

export function LiveCoachSearch() {
  const [coaches, setCoaches] = useState<PublicCoach[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [minTrust, setMinTrust] = useState(80)
  const [activeSkills, setActiveSkills] = useState<string[]>([])
  const [sort, setSort] = useState<(typeof sortOptions)[number]['value']>('trust')

  useEffect(() => {
    getPublicCoaches()
      .then(setCoaches)
      .catch((error: unknown) => setLoadError(error instanceof Error ? error.message : 'Unable to load coaches.'))
      .finally(() => setLoading(false))
  }, [])

  const skills = useMemo(
    () => [...new Set(coaches.flatMap((coach) => coach.skills))].sort(),
    [coaches],
  )
  const priceCeiling = Math.max(10000, ...coaches.map((coach) => Math.ceil(coach.hourlyRateCents / 100) * 100))
  const results = useMemo(() => {
    const filtered = coaches.filter((coach) => {
      const matchesQuery = query.trim() === '' || `${coach.fullName} ${coach.headline} ${coach.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase())
      const matchesSkills = activeSkills.length === 0 || activeSkills.every((skill) => coach.skills.includes(skill))
      return matchesQuery && matchesSkills && coach.hourlyRateCents <= maxPrice * 100 && coach.trustScore >= minTrust
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price') return a.hourlyRateCents - b.hourlyRateCents
      if (sort === 'rating') return b.rating - a.rating
      return b.trustScore - a.trustScore
    })
  }, [activeSkills, coaches, maxPrice, minTrust, query, sort])

  function reset() {
    setQuery('')
    setMaxPrice(Math.ceil(priceCeiling / 100))
    setMinTrust(80)
    setActiveSkills([])
    setSort('trust')
  }

  function toggleSkill(skill: string) {
    setActiveSkills((current) => current.includes(skill) ? current.filter((value) => value !== skill) : [...current, skill])
  }

  if (loading) return <Card className="rounded-2xl border-border/80 p-8 text-sm text-muted-foreground">Loading verified coachesâ€¦</Card>
  if (loadError) return <Card className="rounded-2xl border-destructive/30 p-8 text-sm text-destructive">{loadError}</Card>

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit gap-0 rounded-2xl border-border/80 p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground"><SlidersHorizontal className="size-4" />Filters</p>
          <Button variant="ghost" size="sm" className="rounded-lg" onClick={reset}>Reset</Button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="coach-search">Keyword</Label>
          <div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="coach-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Skill, name or topic" className="h-11 rounded-xl pl-9" /></div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between"><Label htmlFor="price">Max price per session</Label><span className="text-sm font-semibold text-foreground">â‚¹{maxPrice.toLocaleString('en-IN')}</span></div>
          <input id="price" type="range" min={500} max={priceCeiling / 100} step={100} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary" />
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between"><Label htmlFor="trust">Minimum Trust Score</Label><span className="text-sm font-semibold text-foreground">{minTrust}</span></div>
          <input id="trust" type="range" min={0} max={100} step={1} value={minTrust} onChange={(event) => setMinTrust(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary" />
        </div>
        <div className="mt-6"><Label>Skills</Label><div className="mt-2.5 flex flex-wrap gap-1.5">{skills.map((skill) => { const active = activeSkills.includes(skill); return <button key={skill} type="button" onClick={() => toggleSkill(skill)} aria-pressed={active} className={cn('flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors', active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground')}>{skill}{active && <X className="size-3" />}</button> })}</div></div>
      </Card>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{results.length}</span> verified {results.length === 1 ? 'coach' : 'coaches'} match your filters</p>
          <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">{sortOptions.map((option) => <button key={option.value} type="button" onClick={() => setSort(option.value)} aria-pressed={sort === option.value} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors', sort === option.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>{option.label}</button>)}</div>
        </div>
        {results.length ? <div className="grid gap-5 xl:grid-cols-2">{results.map((coach) => <CoachResultCard key={coach.id} coach={coach} />)}</div> : <Card className="items-center gap-0 rounded-2xl border-dashed border-border p-12 text-center"><span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><Search className="size-5" /></span><p className="mt-4 font-display text-lg font-semibold text-foreground">No coaches match these filters</p><p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">Try lowering the minimum Trust Score or removing a skill to widen the search.</p><Button className="mt-5 h-10 rounded-xl px-4" onClick={reset}>Clear filters</Button></Card>}
      </div>
    </div>
  )
}
