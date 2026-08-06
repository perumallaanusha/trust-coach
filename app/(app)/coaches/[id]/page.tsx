import { PageHeader } from '@/components/app-shell'
import { LiveCoachSearch } from '@/components/live-coach-search'

export const metadata = {
  title: 'Find a coach',
  description:
    'Browse verified coaches by skill, price and Trust Score on TrustCoach.',
}

export default function CoachesPage() {
  return (
    <>
      <PageHeader
        title="Find a coach"
        description="Every coach here is identity-verified and every review is tied to a paid session. Filter by what you need to work on."
      />
      <LiveCoachSearch />
    </>
  )
}
