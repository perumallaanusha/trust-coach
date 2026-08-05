import { createBrowserClient } from '@supabase/ssr'

/**
 * Returns the Supabase client for Client Components and browser-only code.
 * Environment variables are configured in Phase 1, Task 2.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}