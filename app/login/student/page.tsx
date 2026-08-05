import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Student login — TrustCoach',
  description: 'Sign in to book verified coaches and track your progress.',
}

export default function StudentLoginPage() {
  return (
    <AuthLayout
      panelTitle="Your coaching, your evidence."
      panelBody="Sign in to see upcoming sessions, milestone progress and the Trust Score behind every coach you consider."
      panelPoints={[
        'Book verified coaches in two clicks',
        'Track skills session by session',
        'Reviews you can trust, because we can prove them',
      ]}
      quote={{
        text: 'Four sessions in and my portfolio finally tells a story. The progress board kept me honest between calls.',
        name: 'Priya Nair',
        role: 'CS student, 3rd year',
        avatar: '/coaches/lena.png',
      }}
    >
      <LoginForm
        role="student"
        heading="Welcome back"
        subheading="Sign in to your student workspace to pick up where you left off."
        redirectTo="/student"
        signupLabel="No student account yet?"
        signupHref="/signup/student"
      />
    </AuthLayout>
  )
}
