import { createClient } from '@/lib/supabase/client'

type SignInInput = {
  email: string
  password: string
}

type SignInResult =
  | { redirectTo: '/student' | '/coach' }
  | { error: string }

export async function signInWithPassword({
  email,
  password,
}: SignInInput): Promise<SignInResult> {
  const supabase = createClient()
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (signInError || !data.user) {
    return { error: signInError?.message ?? 'Unable to sign in. Please try again.' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profileError || !profile) {
    await supabase.auth.signOut()
    return { error: 'Your account profile could not be loaded. Please contact support.' }
  }

  if (profile.role === 'student') return { redirectTo: '/student' }
  if (profile.role === 'coach') return { redirectTo: '/coach' }

  await supabase.auth.signOut()
  return { error: 'This account does not have access to a TrustCoach workspace.' }
}
