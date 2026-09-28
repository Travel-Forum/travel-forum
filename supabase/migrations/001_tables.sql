-- Core tables of the Travel Forum.
-- Field rules mirror the project requirements and the client zod schemas
-- (client validation is for UX, these constraints are the real guarantee).

-- Profiles: one row per auth user, created after sign-up on /complete-profile.
create table profiles (
  id uuid primary key references auth.users (id),
  username text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  is_blocked boolean not null default false,
  about text,
  avatar_url text,

  constraint profiles_first_name_length check (char_length(first_name) between 4 and 32),
  constraint profiles_last_name_length check (char_length(last_name) between 4 and 32),
  constraint profiles_username_length check (char_length(username) between 4 and 32),
  constraint profiles_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  visibility text not null default 'public',

  constraint posts_title_check check (char_length(title) between 16 and 64),
  constraint posts_content_check check (char_length(content) between 32 and 8192),
  constraint posts_visibility_check check (visibility in ('public', 'private'))
);

-- parent_comment_id makes a comment a reply to another comment.
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts (id) on delete cascade,
  author_id uuid not null references profiles (id) on delete cascade,
  parent_comment_id uuid references comments (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),

  constraint comments_content_check check (char_length(content) > 0)
);

-- One like per user per post (composite primary key).
create table post_likes (
  post_id uuid not null references posts (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  created_at timestamptz not null default now(),

  primary key (post_id, user_id)
);

-- Files live in the post-media Storage bucket; this table links them to posts.
-- storage_path format: {userId}/{postId}/{uuid}.{ext}
create table post_media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts (id) on delete cascade,
  media_type text not null,
  storage_path text not null,
  created_at timestamptz not null default now(),

  constraint post_media_media_type_check check (media_type in ('image', 'video'))
);
