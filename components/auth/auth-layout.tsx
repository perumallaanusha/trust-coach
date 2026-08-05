import Link from 'next/link'
import { ArrowLeft, Quote, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/logo'
import { StarRating } from '@/components/primitives'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AuthLayout({
  panelTitle,
  panelBody,
  panelPoints,
  quote,
  children,
}: {
  panelTitle: string
  panelBody: string
  panelPoints: string[]
  quote: { text: string; name: string; role: string; avatar: string }
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-primary px-12 py-14 text-primary-foreground lg:flex lg:flex-col">
        <div
          className="pointer-events-none absolute -right-24 top-10 size-96 rounded-full bg-primary-foreground/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
            <ShieldCheck className="size-5" />
          </span>
          TrustCoach
        </div>

        <div className="relative mt-auto max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight text-balance">
            {panelTitle}
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            {panelBody}
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {panelPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary-foreground/70" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mt-12 rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur-sm">
          <Quote className="size-5 text-primary-foreground/60" aria-hidden="true" />
          <blockquote className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
            {quote.text}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={quote.avatar} alt="" />
              <AvatarFallback>{quote.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{quote.name}</p>
              <p className="text-xs text-primary-foreground/70">{quote.role}</p>
            </div>
            <StarRating rating={5} className="ml-auto [&_svg]:fill-primary-foreground [&_svg]:text-primary-foreground" />
          </figcaption>
        </figure>
      </aside>

      <div className="flex flex-1 flex-col px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Logo className="lg:hidden" />
          <Link
            href="/"
            className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
