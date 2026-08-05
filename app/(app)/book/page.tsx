import { PageHeader } from '@/components/app-shell'
import { BookingFlow } from '@/components/booking-flow'

export const metadata = {
  title: 'Book a session',
  description: 'Book a verified coaching session in three steps.',
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ coach?: string }>
}) {
  const { coach } = await searchParams

  return (
    <>
      <PageHeader
        title="Book a session"
        description="Three steps: choose a coach, pick a time, confirm. Your payment is held in escrow until the session is marked complete."
      />
      <BookingFlow initialCoachId={coach} />
    </>
  )
}
