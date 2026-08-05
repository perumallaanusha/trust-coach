import { createClient } from '@/lib/supabase/client'

export async function requestPasswordReset(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.updateUser({ password })

  if (error || !data.user) {
    throw error ?? new Error('Unable to update your password.')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profileError || !profile) {
    throw new Error('Your password was updated, but your account profile could not be loaded.')
  }

  await supabase.auth.signOut()

  if (profile.role === 'student') return '/login/student'
  if (profile.role === 'coach') return '/login/coach'

  throw new Error('Your password was updated, but this account cannot sign in here.')
}
