import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  href = '/',
  showWordmark = true,
}: {
  className?: string
  href?: string
  showWordmark?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2.5 font-display', className)}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
        <ShieldCheck className="size-5" strokeWidth={2.4} />
      </span>
      {showWordmark && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Trust<span className="text-primary">Coach</span>
        </span>
      )}
    </Link>
  )
}
