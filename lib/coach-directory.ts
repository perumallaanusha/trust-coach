import { createClient } from '@/lib/supabase/client'

export type PublicCoach = {
  id: string
  fullName: string
  avatarUrl: string | null
  headline: string
  bio: string
  location: string | null
  languages: string[]
  hourlyRateCents: number
  currency: string
  responseTimeHours: number | null
  trustScore: number
  verificationStatus: 'approved'
  topRated: boolean
  skills: string[]
  rating: number
  reviewCount: number
  completedSessions: number
  availabilityDays: number[]
}

type PublicCoachRow = {
  id: string
  full_name: string
  avatar_url: string | null
  headline: string
  bio: string
  location: string | null
  languages: string[] | null
  hourly_rate_cents: number
  currency: string
  response_time_hours: number | null
  trust_score: number
  verification_status: 'approved'
  top_rated: boolean
  skills: string[] | null
  rating: number | string
  review_count: number | string
  completed_sessions: number | string
  availability_days: number[] | null
}

export async function getPublicCoaches(coachId?: string): Promise<PublicCoach[]> {
  const { data, error } = await createClient().rpc('get_public_coaches', {
    p_coach_id: coachId ?? null,
  })

  if (error) throw error

  return ((data ?? []) as PublicCoachRow[]).map((coach) => ({
    id: coach.id,
    fullName: coach.full_name,
    avatarUrl: coach.avatar_url,
    headline: coach.headline,
    bio: coach.bio,
    location: coach.location,
    languages: coach.languages ?? [],
    hourlyRateCents: coach.hourly_rate_cents,
    currency: coach.currency,
    responseTimeHours: coach.response_time_hours,
    trustScore: coach.trust_score,
    verificationStatus: coach.verification_status,
    topRated: coach.top_rated,
    skills: coach.skills ?? [],
    rating: Number(coach.rating),
    reviewCount: Number(coach.review_count),
    completedSessions: Number(coach.completed_sessions),
    availabilityDays: coach.availability_days ?? [],
  }))
}
