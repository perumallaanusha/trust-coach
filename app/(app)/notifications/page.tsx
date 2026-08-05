import { PageHeader } from '@/components/app-shell'
import { NotificationFeed, type NotificationItem } from '@/components/notification-feed'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Notifications',
  description: 'Stay up to date with bookings, reviews, goals and Trust Score activity.',
}

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('notifications')
    .select('id, type, title, body, href, read_at, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  const notifications: NotificationItem[] = (data ?? []).map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    body: item.body,
    href: item.href,
    readAt: item.read_at,
    createdAt: item.created_at,
  }))

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Notifications"
        description="Updates from your sessions, reviews, goals and Trust Score."
      />
      <NotificationFeed initialItems={notifications} />
    </div>
  )
}
