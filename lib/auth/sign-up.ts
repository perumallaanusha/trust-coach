import { createClient } from '@/lib/supabase/client'

type SignUpInput = {
  fullName: string
  email: string
  password: string
  role: 'student' | 'coach'
}

type SignUpResult =
  | { redirectTo: '/student' | '/coach' }
  | { confirmationRequired: true }
  | { error: string }

export async function signUpWithPassword({
  fullName,
  email,
  password,
  role,
}: SignUpInput): Promise<SignUpResult> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName.trim(),
        role,
      },
    },
  })

  if (error) return { error: error.message }

  if (!data.user) {
    return { error: 'Unable to create your account. Please try again.' }
  }

  if (!data.session) return { confirmationRequired: true }

  return { redirectTo: role === 'student' ? '/student' : '/coach' }
}
