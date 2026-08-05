import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Choose a new password — TrustCoach',
  description: 'Set a new password for your TrustCoach account.',
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      panelTitle="A fresh start, with your progress intact."
      panelBody="Choose a strong new password to securely return to your TrustCoach workspace."
      panelPoints={[
        'Secure email-link verification',
        'One password for your TrustCoach account',
        'Return to your student or coach workspace',
      ]}
      quote={{
        text: 'The reset was quick, and I was back to preparing for my session in a few minutes.',
        name: 'Sofia Rossi',
        role: 'Full-Stack Engineering Mentor',
        avatar: '/coaches/sofia.png',
      }}
    >
      <ResetPasswordForm />
    </AuthLayout>
  )
}
