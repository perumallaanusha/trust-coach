'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, GraduationCap, Loader2, Mail, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpWithPassword } from '@/lib/auth/sign-up'

export function RegistrationForm({ role }: { role: 'student' | 'coach' }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationRequired, setConfirmationRequired] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await signUpWithPassword({
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      role,
    })

    if ('error' in result) {
      setError(result.error)
      setLoading(false)
      return
    }

    if ('confirmationRequired' in result) {
      setConfirmationRequired(true)
      setLoading(false)
      return
    }

    router.replace(result.redirectTo)
    router.refresh()
  }

  if (confirmationRequired) {
    return (
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <Mail className="size-3.5" />
          Check your email
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
          Confirm your email
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          We sent a confirmation link to your email address. Confirm it, then
          return here to sign in.
        </p>
        <Button
          className="mt-8 h-11 w-full rounded-xl" asChild
        ><Link href={role === 'student' ? '/login/student' : '/login/coach'}>
          Back to sign in
        </Link></Button>
      </div>
    )
  }

  const isStudent = role === 'student'

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <GraduationCap className="size-3.5" />
        {isStudent ? 'Student account' : 'Coach account'}
      </span>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
        Create your account
      </h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        {isStudent
          ? 'Start booking verified coaches and tracking meaningful progress.'
          : 'Create your coach profile and begin the verification process.'}
      </p>

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full name</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="fullName"
              name="fullName"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Your full name"
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{isStudent ? 'Student email' : 'Work email'}</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={isStudent ? 'priya@university.edu' : 'coach@studio.com'}
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="At least 6 characters"
              className="h-11 rounded-xl pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="h-11 rounded-xl">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Creating account' : 'Create account'}
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href={isStudent ? '/login/student' : '/login/coach'}
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
