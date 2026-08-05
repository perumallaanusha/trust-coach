import { PageHeader } from '@/components/app-shell'
import { GoalsBoard } from '@/components/goals-board'

export const metadata = {
  title: 'Goals',
  description: 'Set coaching goals, break them into milestones and track them.',
}

export default function GoalsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Goals"
        description="Goals your coaches can see and hold you to. Tick a milestone to update progress instantly."
      />
      <GoalsBoard />
    </div>
  )
}
