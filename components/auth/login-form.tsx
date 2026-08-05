'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm({
  role,
  heading,
  subheading,
  redirectTo,
  signupLabel,
  signupHref,
}: {
  role: 'student' | 'coach'
  heading: string
  subheading: string
  redirectTo: string
  signupLabel: string
  signupHref: string
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <GraduationCap className="size-3.5" />
        {role === 'student' ? 'Student access' : 'Coach access'}
      </span>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
        {heading}
      </h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        {subheading}
      </p>

      <form
        className="mt-8 flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          setLoading(true)
          window.setTimeout(() => {
            window.location.href = redirectTo
          }, 600)
        }}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            {role === 'student' ? 'Student email' : 'Work email'}
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder={
                role === 'student' ? 'priya@university.edu' : 'coach@studio.com'
              }
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
             href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="••••••••••"
              className="h-11 rounded-xl pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            defaultChecked
            className="size-4 rounded border-border accent-primary"
          />
          Keep me signed in on this device
        </label>

        <Button type="submit" disabled={loading} className="h-11 rounded-xl">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Signing in' : 'Sign in'}
        </Button>
      </form>

      <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="h-11 rounded-xl"
          render={<Link href={redirectTo} />}
        >
          Continue with single sign-on
        </Button>
        <Button
          variant="ghost"
          className="h-11 rounded-xl"
          render={
            <Link href={role === 'student' ? '/login/coach' : '/login/student'} />
          }
        >
          {role === 'student'
            ? 'I am a coach instead'
            : 'I am a student instead'}
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {signupLabel}{' '}
        <Link href={signupHref} className="font-semibold text-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}
