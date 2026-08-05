import { createClient } from '@/lib/supabase/client'

export async function establishRecoverySession() {
  const supabase = createClient()
  const code = new URLSearchParams(window.location.search).get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      throw new Error('This password-reset link is invalid or has expired. Please request a new one.')
    }

    window.history.replaceState({}, document.title, window.location.pathname)
    return true
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return Boolean(session)
}
