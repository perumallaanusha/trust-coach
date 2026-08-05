import type { Metadata } from 'next'
import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Coach login — TrustCoach',
  description:
    'Sign in to manage your roster, availability, payouts and Trust Score.',
}

export default function CoachLoginPage() {
  return (
    <AuthLayout
      panelTitle="Get paid for the reputation you earned."
      panelBody="Manage availability, roster and payouts in one place — and let your Trust Score do the selling."
      panelPoints={[
        'Verified badge after ID and credential checks',
        'Automatic payouts and invoicing per session',
        'Trust Score analytics with factor-level detail',
      ]}
      quote={{
        text: 'I stopped explaining my background on every intro call. The Trust Score breakdown answers it before we meet.',
        name: 'Sofia Rossi',
        role: 'Full-Stack Engineering Mentor',
        avatar: '/coaches/sofia.png',
      }}
    >
      <LoginForm
        role="coach"
        heading="Coach sign in"
        subheading="Access your roster, calendar and earnings dashboard."
        redirectTo="/coach"
        signupLabel="Want to coach on TrustCoach?"
        signupHref="/signup/coach"
      />
    </AuthLayout>
  )
}
