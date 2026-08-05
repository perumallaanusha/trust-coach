import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Reset password — TrustCoach',
  description: 'Request a secure TrustCoach password-reset link.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      panelTitle="Get back to your progress."
      panelBody="Request a secure reset link to return to your TrustCoach student or coach workspace."
      panelPoints={[
        'Secure reset links sent by email',
        'One account works with your role-based workspace',
        'Your coaching history remains protected',
      ]}
      quote={{
        text: 'Everything I needed was still there when I got back: goals, notes, and my next session.',
        name: 'Priya Nair',
        role: 'CS student, 3rd year',
        avatar: '/coaches/lena.png',
      }}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
