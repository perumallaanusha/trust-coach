import { BadgeCheck, MessageSquare, ShieldCheck, ThumbsUp } from 'lucide-react'
import { PageHeader } from '@/components/app-shell'
import { Meter, StarRating } from '@/components/primitives'
import { ReviewComposer } from '@/components/review-composer'
import { Card } from '@/components/ui/card'
import { reviews } from '@/lib/data'

export const metadata = {
  title: 'Reviews',
  description: 'Verified reviews from completed coaching sessions.',
}

const distribution = [
  { stars: 5, count: 148 },
  { stars: 4, count: 41 },
  { stars: 3, count: 14 },
  { stars: 2, count: 6 },
  { stars: 1, count: 5 },
]

export default function ReviewsPage() {
  const totalReviews = distribution.reduce((sum, d) => sum + d.count, 0)
  const average =
    distribution.reduce((sum, d) => sum + d.stars * d.count, 0) / totalReviews

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Reviews"
        description="Every review on TrustCoach is attached to a paid session that both sides marked complete. No anonymous drive-by ratings."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <Card className="gap-0 rounded-2xl border-border/80 p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="shrink-0 text-center sm:w-40">
                <p className="font-display text-5xl font-bold leading-none text-foreground">
                  {average.toFixed(1)}
                </p>
                <StarRating
                  rating={average}
                  size="md"
                  className="mt-2 justify-center"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  {totalReviews} verified reviews
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {distribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-10 shrink-0 text-sm text-muted-foreground">
                      {row.stars} star
                    </span>
                    <Meter
                      value={(row.count / totalReviews) * 100}
                      label={`${row.stars} star reviews`}
                    />
                    <span className="w-10 shrink-0 text-right text-sm text-muted-foreground">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="gap-0 rounded-2xl border-border/80 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-foreground">
                        {review.author}
                      </p>
                      {review.verified && (
                        <BadgeCheck
                          className="size-4 text-primary"
                          aria-label="Verified session"
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.role} · coached by {review.coach}
                    </p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={review.rating} className="justify-end" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {review.title}
                </h3>
                <p className="mt-1.5 text-pretty leading-relaxed text-muted-foreground">
                  {review.body}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <ThumbsUp className="size-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <MessageSquare className="size-4" />
                    Reply
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ReviewComposer />

          <Card className="h-fit gap-0 rounded-2xl border-border/80 p-6">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Why these reviews hold up
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              {[
                'A review can only be written by the student who attended and paid for the session.',
                'Coaches can reply publicly but cannot delete or edit a review.',
                'Reviews left within 14 days of a session carry the most weight.',
                'Suspicious patterns lower the coach Trust Score rather than being silently removed.',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
