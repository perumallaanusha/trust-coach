'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Mail, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/lib/supabase/client'

type SettingsFormProps = {
  userId: string
  email: string
  fullName: string
  timezone: string
  role: 'student' | 'coach'
  preferences: {
    emailBookingUpdates: boolean
    emailReviewUpdates: boolean
    emailMarketing: boolean
    inAppNotifications: boolean
  }
}

export function SettingsForm({
  userId,
  email,
  fullName: initialFullName,
  timezone: initialTimezone,
  role,
  preferences: initialPreferences,
}: SettingsFormProps) {
  const [fullName, setFullName] = useState(initialFullName)
  const [timezone, setTimezone] = useState(initialTimezone)
  const [preferences, setPreferences] = useState(initialPreferences)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const supabase = createClient()
    const [{ error: profileError }, { error: settingsError }] = await Promise.all([
      supabase
        .from('profiles')
        .update({ full_name: fullName.trim(), timezone: timezone.trim() || 'UTC' })
        .eq('id', userId),
      supabase
        .from('user_settings')
        .update({
          email_booking_updates: preferences.emailBookingUpdates,
          email_review_updates: preferences.emailReviewUpdates,
          email_marketing: preferences.emailMarketing,
          in_app_notifications: preferences.inAppNotifications,
        })
        .eq('user_id', userId),
    ])

    if (profileError || settingsError) {
      setError(profileError?.message ?? settingsError?.message ?? 'Unable to save settings.')
      setLoading(false)
      return
    }

    setMessage('Settings saved.')
    setLoading(false)
  }

  return (
    <form className="mx-auto flex max-w-3xl flex-col gap-6" onSubmit={handleSubmit}>
      <Card className="gap-0 rounded-2xl border-border/80 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account details for the {role} workspace.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="full-name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                minLength={2}
                required
                className="h-11 rounded-xl pl-9"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" value={email} disabled className="h-11 rounded-xl pl-9" />
            </div>
            <p className="text-xs text-muted-foreground">Email changes are managed through account recovery.</p>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
              placeholder="Asia/Kolkata"
              className="h-11 rounded-xl"
            />
          </div>
        </div>
      </Card>

      <Card className="gap-0 rounded-2xl border-border/80 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose how TrustCoach keeps you informed.
        </p>

        <div className="mt-5 flex flex-col divide-y divide-border">
          {[
            {
              key: 'emailBookingUpdates' as const,
              title: 'Booking updates',
              detail: 'Session confirmations, changes and reminders by email.',
            },
            {
              key: 'emailReviewUpdates' as const,
              title: 'Review updates',
              detail: 'Email when a review is published or receives a reply.',
            },
            {
              key: 'inAppNotifications' as const,
              title: 'In-app notifications',
              detail: 'Show updates in your TrustCoach notification centre.',
            },
            {
              key: 'emailMarketing' as const,
              title: 'Product updates',
              detail: 'Occasional tips and product news by email.',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
              <Switch
                checked={preferences[item.key]}
                onCheckedChange={(checked) =>
                  setPreferences((current) => ({ ...current, [item.key]: checked }))
                }
                aria-label={item.title}
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div aria-live="polite">
          {message && (
            <p className="flex items-center gap-1.5 text-sm text-[var(--success)]">
              <CheckCircle2 className="size-4" />
              {message}
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <Button type="submit" disabled={loading} className="h-11 rounded-xl px-6">
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? 'Saving' : 'Save settings'}
        </Button>
      </div>
    </form>
  )
}
