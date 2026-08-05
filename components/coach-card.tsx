import Link from 'next/link'
import { BadgeCheck, Clock, MapPin, ShieldCheck } from 'lucide-react'
import { StarRating } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Coach } from '@/lib/data'

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border-border/80 p-0 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start gap-4 p-5">
        <Avatar className="size-14 rounded-2xl">
          <AvatarImage src={coach.avatar} alt={coach.name} />
          <AvatarFallback>{coach.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-base font-semibold text-foreground">
              {coach.name}
            </h3>
            {coach.verified && (
              <BadgeCheck
                className="size-4 shrink-0 text-primary"
                aria-label="Verified coach"
              />
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {coach.title}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={coach.rating} showValue />
            <span className="text-xs text-muted-foreground">
              ({coach.reviewCount})
            </span>
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
        {coach.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 px-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5" />
          {coach.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          Replies {coach.responseTime}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border bg-muted/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-lg font-bold text-foreground">
            ${coach.price}
          </span>{' '}
          / session
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-xl px-3"
            render={<Link href={`/coaches/${coach.id}`} />}
          >
            Profile
          </Button>
          <Button
            className="h-9 rounded-xl px-3"
            render={<Link href={`/book?coach=${coach.id}`} />}
          >
            Book
          </Button>
        </div>
      </div>
    </Card>
  )
}
