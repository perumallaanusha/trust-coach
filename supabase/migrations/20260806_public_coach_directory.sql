-- Public coach directory read model.
-- This function deliberately exposes no email, timezone, account state,
-- settings, bookings, notes, or other private profile information.

create or replace function public.get_public_coaches(
  p_coach_id uuid default null
)
returns table (
  id uuid,
  full_name text,
  avatar_url text,
  headline text,
  bio text,
  location text,
  languages text[],
  hourly_rate_cents integer,
  currency char(3),
  response_time_hours smallint,
  trust_score smallint,
  verification_status public.verification_status,
  top_rated boolean,
  skills text[],
  rating numeric,
  review_count bigint,
  completed_sessions bigint,
  availability_days smallint[]
)
language sql
stable
security definer
set search_path = public
as $$
  select
    cp.user_id as id,
    p.full_name,
    p.avatar_url,
    cp.headline,
    cp.bio,
    cp.location,
    cp.languages,
    cp.hourly_rate_cents,
    cp.currency,
    cp.response_time_hours,
    cp.trust_score,
    cp.verification_status,
    cp.top_rated,
    coalesce(skill_data.skills, array[]::text[]) as skills,
    coalesce(review_data.rating, 0)::numeric as rating,
    coalesce(review_data.review_count, 0)::bigint as review_count,
    coalesce(session_data.completed_sessions, 0)::bigint as completed_sessions,
    coalesce(availability_data.availability_days, array[]::smallint[]) as availability_days
  from public.coach_profiles cp
  join public.profiles p on p.id = cp.user_id
  left join lateral (
    select array_agg(s.name order by s.name) as skills
    from public.coach_skills cs
    join public.skills s on s.id = cs.skill_id
    where cs.coach_id = cp.user_id
  ) skill_data on true
  left join lateral (
    select
      round(avg(r.rating)::numeric, 1) as rating,
      count(*) as review_count
    from public.reviews r
    where r.coach_id = cp.user_id
      and r.is_published = true
  ) review_data on true
  left join lateral (
    select count(*) as completed_sessions
    from public.bookings b
    where b.coach_id = cp.user_id
      and b.status = 'completed'
  ) session_data on true
  left join lateral (
    select array_agg(distinct ca.day_of_week order by ca.day_of_week) as availability_days
    from public.coach_availability ca
    where ca.coach_id = cp.user_id
      and ca.is_active = true
  ) availability_data on true
  where cp.verification_status = 'approved'
    and cp.is_accepting_bookings = true
    and (p_coach_id is null or cp.user_id = p_coach_id)
  order by cp.trust_score desc, review_data.rating desc nulls last, cp.hourly_rate_cents asc;
$$;

revoke all on function public.get_public_coaches(uuid) from public;
grant execute on function public.get_public_coaches(uuid) to anon, authenticated;
