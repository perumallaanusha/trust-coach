'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { requestPasswordReset } from '@/lib/auth/password-reset'

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      await requestPasswordReset(String(formData.get('email') ?? ''))
      setSent(true)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to send a reset link. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <Mail className="size-3.5" />
          Check your email
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
          Reset link sent
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          If an account exists for that email address, you will receive a link
          to choose a new password.
        </p>
        <Button
          variant="outline"
          className="mt-8 h-11 w-full rounded-xl" asChild
        ><Link href="/login/student">
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link></Button>
      </div>
    )
  }

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Mail className="size-3.5" />
        Password recovery
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
        Reset your password
      </h1>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        Enter the email address associated with your student or coach account.
      </p>

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 rounded-xl pl-9"
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="h-11 rounded-xl">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Sending link' : 'Send reset link'}
        </Button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Link
        href="/login/student"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  )
}
