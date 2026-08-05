import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { RegistrationForm } from '@/components/auth/registration-form'

export const metadata: Metadata = {
  title: 'Create coach account — TrustCoach',
  description: 'Create a TrustCoach coach account and begin verification.',
}

export default function CoachSignupPage() {
  return (
    <AuthLayout
      panelTitle="Let your work speak with proof."
      panelBody="Create your coach account, complete verification, and manage your availability, students, and reputation in one place."
      panelPoints={[
        'Build a verified coach profile',
        'Manage availability and your student roster',
        'Earn a Trust Score from completed sessions',
      ]}
      quote={{
        text: 'My profile finally reflects the way I coach: practical, direct, and backed by the outcomes students see.',
        name: 'Sofia Rossi',
        role: 'Full-Stack Engineering Mentor',
        avatar: '/coaches/sofia.png',
      }}
    >
      <RegistrationForm role="coach" />
    </AuthLayout>
  )
}
