'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updatePassword } from '@/lib/auth/password-reset'
import { createClient } from '@/lib/supabase/client'
import { establishRecoverySession } from '@/lib/auth/recovery-session'

export function ResetPasswordForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
  const supabase = createClient()

  async function prepareRecoverySession() {
    try {
      const hasRecoverySession = await establishRecoverySession()
      setReady(hasRecoverySession)
    } catch (recoveryError) {
      setError(
        recoveryError instanceof Error
          ? recoveryError.message
          : 'This password-reset link is invalid or has expired. Please request a new one.',
      )
    }
  }

  prepareRecoverySession()

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY' || session) {
      setReady(true)
    }
  })

  return () => subscription.unsubscribe()
}, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password') ?? '')
    const confirmation = String(formData.get('confirmation') ?? '')

    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const redirectTo = await updatePassword(password)
      setComplete(true)
      window.setTimeout(() => router.replace(redirectTo), 1200)
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : 'Unable to update your password. Please request a new link.',
      )
      setLoading(false)
    }
  }

  if (complete) {
    return (
      <div className="text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CheckCircle2 className="size-6" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
          Password updated
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          Your password has been changed. Redirecting you to sign in.
        </p>
      </div>
    )
  }

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Secure password reset
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
        Choose a new password
      </h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        Set a new password for your TrustCoach account.
      </p>

      {!ready && (
        <p className="mt-5 rounded-xl border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          Open this page using the secure link in your password-reset email.
        </p>
      )}

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New password</Label>
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmation">Confirm new password</Label>
          <Input
            id="confirmation"
            name="confirmation"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Repeat your new password"
            className="h-11 rounded-xl"
          />
        </div>

        <Button type="submit" disabled={loading || !ready} className="h-11 rounded-xl">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Updating password' : 'Update password'}
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Link
        href="/login/student"
        className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
      >
        Back to sign in
      </Link>
    </div>
  )
}
