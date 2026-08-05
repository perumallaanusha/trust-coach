import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { RegistrationForm } from '@/components/auth/registration-form'

export const metadata: Metadata = {
  title: 'Create student account — TrustCoach',
  description: 'Create a TrustCoach student account to book verified coaches.',
}

export default function StudentSignupPage() {
  return (
    <AuthLayout
      panelTitle="Build progress you can prove."
      panelBody="Create your student account to book verified coaches, keep session evidence together, and see your growth over time."
      panelPoints={[
        'Book verified coaches with clear evidence',
        'Track milestones between sessions',
        'Build a Trust Score from real activity',
      ]}
      quote={{
        text: 'The structure made it easier to follow through. I always knew what to work on before the next session.',
        name: 'Priya Nair',
        role: 'CS student, 3rd year',
        avatar: '/coaches/lena.png',
      }}
    >
      <RegistrationForm role="student" />
    </AuthLayout>
  )
}
