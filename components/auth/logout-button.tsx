'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/sign-out'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)

    try {
      await signOut()
      router.replace('/')
      router.refresh()
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-9 w-full justify-start rounded-xl px-2 text-muted-foreground"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
      {loading ? 'Signing out' : 'Sign out'}
    </Button>
  )
}
