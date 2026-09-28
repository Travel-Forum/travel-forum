# Travel Forum

> 🚧 **Status: in development.** Core posting features work; comments, voting, profile editing and the admin panel are still being built. See [Roadmap](#roadmap).

A community forum for travellers: people share trips, tips and questions, comment on each other's posts and vote on the most useful ones.

Built with React, Chakra UI and Supabase (Postgres, Auth, Storage).

**Hosted version:** not deployed yet.

---

## Features

### Done

**Public part (no account needed)**
- Home page with the platform's key features and live counters of users and posts
- Lists of the 10 most recent and the 10 most commented posts
- Sign up with email and password (with email confirmation) or with Google
- Sign in / sign out

**Private part (signed-in users)**
- Profile completion after sign-up: first name, last name, username, phone
- Feed with posts from all users
- Create a post:
  - title (16–64 characters) and content (32–8192 characters) with live character hints
  - visibility: everyone or only me
  - emoji picker that inserts at the cursor
  - image and video attachments with preview and remove
  - confirmation before discarding an unsaved draft
- Post details view with media viewer (images and videos), like count and comments
- Profile page (read-only for now)

**Database and security**
- Row Level Security on every table: private posts are visible only to their author, users can change only their own data
- Blocked users cannot create posts or comments (enforced in the database)
- Users cannot change their username, admin or blocked status
- Private Storage bucket for media, served through short-lived signed URLs

### Roadmap

**User features**
- [ ] Edit and delete own posts (from the post details and from the feed)
- [ ] Comments and replies; edit and delete own comments
- [ ] Upvote / downvote posts and comments
- [ ] Edit profile information and upload a profile photo
- [ ] Public profile of any user with their posts and comments
- [ ] Sort and filter posts (feed, user profile)

**Admin panel**
- [ ] Search users by username, email or display name
- [ ] Block / unblock users
- [ ] Delete any post
- [ ] List all posts with sort and filter

**Community**
- [ ] Reputation score from votes on a user's posts and comments
- [ ] Badges for milestones (posts, comments, reputation, membership time)
- [ ] Post tags with tag search (optional)

**Quality**
- [ ] Unit tests for React components (Vitest + React Testing Library)
- [ ] CI pipeline (lint, tests, build) on every pull request
- [ ] Deployment

---

## Tech stack

| Layer | Tools |
|---|---|
| UI | React 19, Chakra UI v3, React Router 7 |
| Forms | React Hook Form, Zod |
| Backend | Supabase: Postgres, Auth, Storage |
| Tooling | Vite, ESLint |

## Project structure

```
client/src/
├── pages/        route-level screens (Feed, Home, Profile, ...)
├── components/   UI components, grouped by feature (posts, auth, profile, ui, ...)
├── services/     all Supabase calls; return { data } or { error }
├── hooks/        reusable state logic (useAuth, useProfile, usePostDetails)
├── context/      auth and profile providers
├── routes/       route guards (signed in, profile completed, guest only)
├── schemas/      Zod validation schemas
├── utils/        small pure helpers (dates, names, text, errors, toasts)
└── config/       Supabase client and environment variables
supabase/
└── migrations/   SQL scripts for the database
```

Pages never talk to Supabase directly: they call `services/`, which return `{ data }` or `{ error }` with a user-friendly message.

---

## Running locally

### Prerequisites
- Node.js 20.19+ or 22.12+
- A Supabase project

### 1. Set up the database
In the Supabase SQL Editor, run the files in [`supabase/migrations/`](supabase/migrations/) **in order** (see [Database](#database)).

In **Authentication → URL Configuration**, add `http://localhost:5173/auth/callback` to the redirect URLs. To use Google sign-in, enable the Google provider in **Authentication → Providers**.

### 2. Configure the client
```bash
cd client
npm install
```

Create `client/.env`:
```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
VITE_APP_URL=http://localhost:5173
```
Both Supabase values are in the dashboard under **Project Settings → API**.

### 3. Run
```bash
npm run dev      # development server on http://localhost:5173
npm run lint     # ESLint
npm run build    # production build
```

---

## Database

### Tables

Relationships:
- `auth.users` 1 → 1 `profiles`
- `profiles` 1 → N `posts`, `comments`, `post_likes`
- `posts` 1 → N `comments`, `post_likes`, `post_media`
- `comments` 1 → N `comments` (replies through `parent_comment_id`)

Deleting a profile or a post deletes everything that belongs to it (`ON DELETE CASCADE`).

**profiles** — one per registered user
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK, references `auth.users` |
| `username` | text | unique, 4–32 characters, cannot be changed |
| `first_name` | text | 4–32 characters |
| `last_name` | text | 4–32 characters |
| `email` | text | unique, valid email format |
| `phone` | text | required |
| `about` | text | optional |
| `avatar_url` | text | optional |
| `is_admin` | boolean | default `false` |
| `is_blocked` | boolean | default `false` |
| `created_at` | timestamptz | default `now()` |

**posts**
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK |
| `author_id` | uuid | references `profiles`, cascade delete |
| `title` | text | 16–64 characters |
| `content` | text | 32–8192 characters |
| `visibility` | text | `public` or `private`, default `public` |
| `created_at` | timestamptz | default `now()` |

**comments**
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK |
| `post_id` | uuid | references `posts`, cascade delete |
| `author_id` | uuid | references `profiles`, cascade delete |
| `parent_comment_id` | uuid | optional, references `comments` — set for replies |
| `content` | text | not empty |
| `created_at` | timestamptz | default `now()` |

**post_likes** — one like per user per post
| Column | Type | Rules |
|---|---|---|
| `post_id` | uuid | PK part, references `posts`, cascade delete |
| `user_id` | uuid | PK part, references `profiles`, cascade delete |
| `created_at` | timestamptz | default `now()` |

**post_media** — images and videos attached to a post
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK |
| `post_id` | uuid | references `posts`, cascade delete |
| `media_type` | text | `image` or `video` |
| `storage_path` | text | `{userId}/{postId}/{uuid}.{ext}` in the `post-media` bucket |
| `created_at` | timestamptz | default `now()` |

**Also:**
- `posts_with_comment_count` — view used by the home page lists; respects RLS
- `get_public_stats()` — returns the total number of posts and users for the home page
- `post-media` — private Storage bucket, 50 MB per file, JPEG / PNG / WebP / GIF / MP4 / WebM

### Scripts

| File | Creates |
|---|---|
| `001_tables.sql` | tables and field constraints |
| `002_views_and_functions.sql` | view and function |
| `003_indexes.sql` | indexes on foreign key columns |
| `004_rls_policies.sql` | Row Level Security policies |
| `005_storage.sql` | `post-media` bucket and its access policies |

The scripts build the database from an empty Supabase project; don't run them on a database that already has these tables. Every later change goes into a new numbered file (`006_...sql`) in the same pull request as the code that needs it.
