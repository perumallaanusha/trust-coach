'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const links = [
  { href: '#how', label: 'How it works' },
  { href: '#trust', label: 'Trust Score' },
  { href: '#coaches', label: 'Coaches' },
  { href: '#pricing', label: 'Pricing' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            className="h-10 rounded-xl px-4"
            render={<Link href="/login/coach" />}
          >
            Coach login
          </Button>
          <Button
            className="h-10 rounded-xl px-4"
            render={<Link href="/login/student" />}
          >
            Student login
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon-lg"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button
              variant="outline"
              className="h-10 w-full rounded-xl"
              render={<Link href="/login/coach" />}
            >
              Coach login
            </Button>
            <Button
              className="h-10 w-full rounded-xl"
              render={<Link href="/login/student" />}
            >
              Student login
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
