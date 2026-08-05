'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { CoachCard } from '@/components/coach-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { coaches } from '@/lib/data'

const skillFilters = [
  'UX Research',
  'Portfolio Review',
  'Python',
  'SQL',
  'Case Interviews',
  'Public Speaking',
  'React',
  'System Design',
]

const sortOptions = [
  { value: 'trust', label: 'Trust Score' },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Lowest price' },
] as const

export function CoachSearch() {
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(80)
  const [minTrust, setMinTrust] = useState(80)
  const [activeSkills, setActiveSkills] = useState<string[]>([])
  const [sort, setSort] = useState<(typeof sortOptions)[number]['value']>(
    'trust',
  )

  const results = useMemo(() => {
    const filtered = coaches.filter((coach) => {
      const matchesQuery =
        query.trim() === '' ||
        `${coach.name} ${coach.title} ${coach.skills.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase())
      const matchesSkills =
        activeSkills.length === 0 ||
        activeSkills.every((skill) => coach.skills.includes(skill))
      return (
        matchesQuery &&
        matchesSkills &&
        coach.price <= maxPrice &&
        coach.trustScore >= minTrust
      )
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'price') return a.price - b.price
      if (sort === 'rating') return b.rating - a.rating
      return b.trustScore - a.trustScore
    })
  }, [query, activeSkills, maxPrice, minTrust, sort])

  const toggleSkill = (skill: string) =>
    setActiveSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    )

  const reset = () => {
    setQuery('')
    setMaxPrice(80)
    setMinTrust(80)
    setActiveSkills([])
    setSort('trust')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit gap-0 rounded-2xl border-border/80 p-5 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <SlidersHorizontal className="size-4" />
            Filters
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg"
            onClick={reset}
          >
            Reset
          </Button>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Label htmlFor="coach-search">Keyword</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="coach-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Skill, name or topic"
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Max price per session</Label>
            <span className="text-sm font-semibold text-foreground">
              ${maxPrice}
            </span>
          </div>
          <input
            id="price"
            type="range"
            min={20}
            max={80}
            step={1}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="trust">Minimum Trust Score</Label>
            <span className="text-sm font-semibold text-foreground">
              {minTrust}
            </span>
          </div>
          <input
            id="trust"
            type="range"
            min={60}
            max={100}
            step={1}
            value={minTrust}
            onChange={(event) => setMinTrust(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
        </div>

        <div className="mt-6">
          <Label>Skills</Label>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {skillFilters.map((skill) => {
              const active = activeSkills.includes(skill)
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  aria-pressed={active}
                  className={cn(
                    'flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {skill}
                  {active && <X className="size-3" />}
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {results.length}
            </span>{' '}
            verified {results.length === 1 ? 'coach' : 'coaches'} match your
            filters
          </p>
          <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value)}
                aria-pressed={sort === option.value}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  sort === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {results.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        ) : (
          <Card className="items-center gap-0 rounded-2xl border-dashed border-border p-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Search className="size-5" />
            </span>
            <p className="mt-4 font-display text-lg font-semibold text-foreground">
              No coaches match these filters
            </p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Try lowering the minimum Trust Score or removing a skill to widen
              the search.
            </p>
            <Button className="mt-5 h-10 rounded-xl px-4" onClick={reset}>
              Clear filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
