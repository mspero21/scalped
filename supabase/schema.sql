-- Scalped Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Custom types
create type sport_type as enum ('NFL', 'NBA', 'MLB', 'NHL', 'MLS', 'NCAA_FOOTBALL', 'NCAA_BASKETBALL', 'SOCCER', 'RUGBY', 'CRICKET', 'MOTORSPORT', 'AFL', 'CFL', 'XFL', 'OTHER');
create type roof_type as enum ('OPEN', 'DOME', 'RETRACTABLE');

-- Stadiums table
create table stadiums (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text not null,
  state text not null,
  country text not null default 'USA',
  sport sport_type not null,
  team_name text not null,
  capacity integer not null,
  year_built integer not null,
  roof_type roof_type not null default 'OPEN',
  image_url text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  league text,                    -- Specific league (e.g., "Premier League")
  sportsdb_venue_id text,         -- TheSportsDB venue ID for data sync
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Profiles table (extends Supabase auth.users)
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Visits table (track stadium visits)
create table visits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stadium_id uuid references stadiums(id) on delete cascade not null,
  visited_at date not null default current_date,
  section text,
  event_type text,
  notes text,
  photos text[] default '{}',
  created_at timestamptz default now(),
  unique(user_id, stadium_id, visited_at)
);

-- Rankings table (user's ranked stadium list)
create table rankings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stadium_id uuid references stadiums(id) on delete cascade not null,
  rank_position integer not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, stadium_id),
  unique(user_id, rank_position)
);

-- Reviews table
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stadium_id uuid references stadiums(id) on delete cascade not null,
  atmosphere_rating integer check (atmosphere_rating between 1 and 5),
  food_rating integer check (food_rating between 1 and 5),
  sightlines_rating integer check (sightlines_rating between 1 and 5),
  accessibility_rating integer check (accessibility_rating between 1 and 5),
  value_rating integer check (value_rating between 1 and 5),
  overall_rating integer check (overall_rating between 1 and 5) not null,
  review_text text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, stadium_id)
);

-- Bucket list table
create table bucket_list (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  stadium_id uuid references stadiums(id) on delete cascade not null,
  priority integer default 0,
  notes text,
  created_at timestamptz default now(),
  unique(user_id, stadium_id)
);

-- Follows table (social features)
create table follows (
  id uuid primary key default uuid_generate_v4(),
  follower_id uuid references auth.users(id) on delete cascade not null,
  following_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(follower_id, following_id),
  check (follower_id != following_id)
);

-- Indexes for performance
create index idx_stadiums_sport on stadiums(sport);
create index idx_stadiums_city on stadiums(city);
create index idx_visits_user on visits(user_id);
create index idx_visits_stadium on visits(stadium_id);
create index idx_rankings_user on rankings(user_id);
create index idx_rankings_stadium on rankings(stadium_id);
create index idx_reviews_stadium on reviews(stadium_id);
create index idx_bucket_list_user on bucket_list(user_id);
create index idx_follows_follower on follows(follower_id);
create index idx_follows_following on follows(following_id);

-- Row Level Security (RLS)
alter table stadiums enable row level security;
alter table profiles enable row level security;
alter table visits enable row level security;
alter table rankings enable row level security;
alter table reviews enable row level security;
alter table bucket_list enable row level security;
alter table follows enable row level security;

-- Stadiums: Public read access
create policy "Stadiums are viewable by everyone" on stadiums for select using (true);

-- Profiles: Public read, own write
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = user_id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = user_id);

-- Visits: Public read, own write
create policy "Visits are viewable by everyone" on visits for select using (true);
create policy "Users can manage own visits" on visits for all using (auth.uid() = user_id);

-- Rankings: Public read, own write
create policy "Rankings are viewable by everyone" on rankings for select using (true);
create policy "Users can manage own rankings" on rankings for all using (auth.uid() = user_id);

-- Reviews: Public read, own write
create policy "Reviews are viewable by everyone" on reviews for select using (true);
create policy "Users can manage own reviews" on reviews for all using (auth.uid() = user_id);

-- Bucket list: Public read, own write
create policy "Bucket lists are viewable by everyone" on bucket_list for select using (true);
create policy "Users can manage own bucket list" on bucket_list for all using (auth.uid() = user_id);

-- Follows: Public read, own write
create policy "Follows are viewable by everyone" on follows for select using (true);
create policy "Users can manage own follows" on follows for all using (auth.uid() = follower_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, username, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

