'use client'
import { LogoutButton } from '@/components/auth/logout-button'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bell,
  CalendarPlus,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Target,
  UserCog,
  X,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const groups = [
  {
    label: 'Overview',
    items: [
      { href: '/student', label: 'Student dashboard', icon: LayoutDashboard },
      { href: '/coach', label: 'Coach dashboard', icon: GraduationCap },
    ],
  },
  {
    label: 'Coaching',
    items: [
      { href: '/coaches', label: 'Search coaches', icon: Search },
      { href: '/book', label: 'Book a session', icon: CalendarPlus },
      { href: '/reviews', label: 'Reviews', icon: Star },
      { href: '/trust-score', label: 'Trust Score', icon: ShieldCheck },
    ],
  },
  {
    label: 'Growth',
    items: [
      { href: '/progress', label: 'Progress tracker', icon: LineChart },
      { href: '/goals', label: 'Goals', icon: Target },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/notifications', label: 'Notifications', icon: Bell },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {group.label}
          </p>
          {group.items.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function SidebarFooter() {
  return (
    <div className="border-t border-sidebar-border p-3">
      <Link
        href="/settings"
        className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
      >
        <Avatar className="size-9">
          <AvatarImage src="/coaches/lena.png" alt="" />
          <AvatarFallback>PN</AvatarFallback>
        </Avatar>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-foreground">
            Priya Nair
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Student · Trust 82
          </span>
        </span>
        <UserCog className="size-4 text-muted-foreground" />
      </Link>
      <LogoutButton />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-svh bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Logo />
        </div>
        <NavLinks />
        <SidebarFooter />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[276px] flex-col bg-sidebar shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </Button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
            <SidebarFooter />
          </div>
        </div>
      )}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
          <div className="hidden flex-1 items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground sm:flex md:max-w-sm">
            <Search className="size-4" />
            <span>Search coaches, sessions, goals</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
            </Link>
            <Button
              render={<Link href="/book" />}
              className="hidden h-10 rounded-xl px-4 sm:inline-flex"
            >
              <CalendarPlus className="size-4" />
              Book session
            </Button>
            <Avatar className="size-9 lg:hidden">
              <AvatarImage src="/coaches/lena.png" alt="" />
              <AvatarFallback>PN</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}
