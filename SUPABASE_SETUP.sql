-- USIC: cuentas, progreso, objetivos y estadísticas
-- Ejecuta este archivo UNA VEZ en Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text not null default 'Estudiante',
  avatar_url text,
  focus_area text,
  weekly_goal_minutes integer not null default 180 check (weekly_goal_minutes between 30 and 3000),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- Si ya habías ejecutado una versión anterior del setup, estas ALTER hacen la migración de forma segura.
alter table public.profiles add column if not exists focus_area text;
alter table public.profiles add column if not exists weekly_goal_minutes integer not null default 180;
alter table public.profiles add column if not exists onboarding_completed boolean not null default false;

create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  metric text not null check (metric in ('lessons','minutes','area_percent')),
  target numeric not null check (target > 0),
  area_id text,
  deadline date,
  status text not null default 'active' check (status in ('active','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists goals_user_status_idx on public.goals(user_id,status);

create table if not exists public.study_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_seconds integer not null default 0 check (active_seconds >= 0),
  last_lesson text
);
create index if not exists study_sessions_user_started_idx on public.study_sessions(user_id,started_at desc);

alter table public.profiles enable row level security;
alter table public.user_state enable row level security;
alter table public.goals enable row level security;
alter table public.study_sessions enable row level security;

-- Cada usuario solo ve/modifica sus propios datos.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "state_own" on public.user_state;
create policy "state_own" on public.user_state for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "goals_own" on public.goals;
create policy "goals_own" on public.goals for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "sessions_own" on public.study_sessions;
create policy "sessions_own" on public.study_sessions for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

grant select,insert,update,delete on public.profiles to authenticated;
grant select,insert,update,delete on public.user_state to authenticated;
grant select,insert,update,delete on public.goals to authenticated;
grant select,insert,update,delete on public.study_sessions to authenticated;

-- Crea el perfil automáticamente al registrarse.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id,email,display_name)
  values (new.id,new.email,coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email,'@',1),'Estudiante'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
