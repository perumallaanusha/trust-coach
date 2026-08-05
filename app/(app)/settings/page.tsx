import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/app-shell'
import { SettingsForm } from '@/components/settings-form'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Settings',
  description: 'Manage your TrustCoach account and notification preferences.',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login/student')

  const [{ data: profile }, { data: settings }] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, email, timezone, role')
      .eq('id', user.id)
      .single(),
    supabase
      .from('user_settings')
      .select('email_booking_updates, email_review_updates, email_marketing, in_app_notifications')
      .eq('user_id', user.id)
      .single(),
  ])

  const role = profile?.role === 'coach' ? 'coach' : 'student'

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Settings"
        description="Manage your account details and the updates you receive from TrustCoach."
      />
      <SettingsForm
        userId={user.id}
        email={profile?.email ?? user.email ?? ''}
        fullName={profile?.full_name ?? ''}
        timezone={profile?.timezone ?? 'UTC'}
        role={role}
        preferences={{
          emailBookingUpdates: settings?.email_booking_updates ?? true,
          emailReviewUpdates: settings?.email_review_updates ?? true,
          emailMarketing: settings?.email_marketing ?? false,
          inAppNotifications: settings?.in_app_notifications ?? true,
        }}
      />
    </div>
  )
}
