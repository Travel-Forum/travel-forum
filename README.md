# Travel Forum

## 🌍 Live demo: [travel-forum-seven.vercel.app](https://travel-forum-seven.vercel.app)

> 🚧 **Status: in development.** All core features are live: posts with media, comments, likes, real-time notifications, search and sort, public user profiles, profile editing and the admin panel. Next up: a weather widget for popular destinations. See [Roadmap](#roadmap).

A community forum for travellers: people share trips, tips and questions, comment on each other's posts and like the most useful ones.

Built with React, Chakra UI and Supabase (Postgres, Auth, Storage, Realtime). Every merge to `main` is tested and deployed automatically.

---

## Features

### Done

**Public part (no account needed)**
- Home page with the platform's key features and live counters of users and posts
- Lists of the 10 most recent and the 10 most commented posts
- Sign up with email and password or with Google; after an email sign-up a "Check your email" page replaces the form, so it can't be submitted again by accident
- Sign in / sign out
- Forgot password: a reset link is sent by email and opens a page to choose a new password; the same message is shown whether the account exists or not
- About, Community Guidelines, Privacy and Terms pages, linked from the footer

**Private part (signed-in users)**
- Profile completion after sign-up: first name, last name, username, phone
- Feed with posts from all users
- Fixed feed layout on desktop: only the posts scroll, the profile card and the footer links on the left stay in place
- Search posts by a word in the title or content, right from the navbar as you type
- Sort posts by newest, most liked or most commented; search and sort are kept in the URL (`/feed?q=rila&sort=likes`), so they survive a refresh and can be shared
- Create a post:
  - title (16–64 characters) and content (32–8192 characters) with live character hints
  - visibility: everyone or only me
  - emoji picker that inserts at the cursor
  - image and video attachments with preview and remove
  - confirmation before discarding an unsaved draft
- Edit and delete own posts from the feed and from the post details; deleting a post also removes its media from Storage
- Post details view with media viewer (images and videos), like count and comments
- Like and unlike posts from the feed and from the post details (updates instantly)
- Comments with nested replies on any post; edit and delete own comments (deleting a comment also removes its replies)
- Notifications for likes, comments and replies, delivered in real time: unread count on the bell, mark one or all as read, open the post from a notification
- Profile page: edit first name, last name and phone (username and email stay read-only), upload a profile photo, role badge (Admin or Member)
- Public profile of any user at `/users/<username>` with their posts, opened by clicking an author's name or photo; your own username leads to your profile page
- Responsive layout: on phones and tablets the feed shows only the posts, and the About / Guidelines / Privacy / Terms links move into the profile menu

**Admin panel** (`/admin`, admins only)
- **Users:** search by username, email or name; block / unblock; give or remove admin rights (an admin can't change their own account)
- **Posts:** every post, including private ones, with search, sort and delete
- The navbar shows the admin link only to admins; non-admins who open `/admin` are sent back to the feed

**Design**
- Custom Chakra UI theme: ocean teal and coral palette on a warm sand background, Fraunces for headings and DM Sans for text
- Light and dark mode with a toggle in the navbar
- Home page with polaroid photos, count-up stats and sections that fade in on scroll
- Cards lift on hover; the join section is styled as a boarding pass
- Animations are turned off for users who prefer reduced motion

**Database and security**
- Row Level Security on every table: private posts, together with their comments and likes, are visible only to their author; users can change only their own data
- Blocked users can still read everything but cannot create, edit, delete, like or upload anything (enforced in the database); they see a banner and disabled actions, updated in real time when an admin blocks or unblocks them
- Users cannot change their username, email, admin or blocked status, and a new profile must use the email of the signed-in account
- Other users' email and phone are private: everyone else is read through the `public_profiles` view, which has only the public columns
- Admin rights are checked in the database too (`is_admin()`), not only by hiding buttons in the UI
- Private Storage bucket for media, served through short-lived signed URLs

### Roadmap

**Planned**
- [ ] Weather widget in the feed's right column: current weather in popular destinations, rotating every few seconds; loaded through a Supabase Edge Function that keeps the weather API key secret and caches the answer
- [ ] JSDoc documentation for services, hooks and shared utils

**Done**
- [x] Password reset by email
- [x] Public user profiles with their posts
- [x] Responsive feed and navbar for phones and tablets
- [x] Refactor: a folder per component, logic moved into hooks, shared layout and post list, consistent error handling
- [x] Edit and delete own posts (from the post details and from the feed)
- [x] Search, sort and filter posts
- [x] Edit profile information and upload a profile photo
- [x] Admin panel: search users, block / unblock, give admin rights, list, sort and delete any post
- [x] "Check your email" page after an email sign-up
- [x] Comments and replies; edit and delete own comments
- [x] Likes and real-time notifications
- [x] Redesign: custom theme, dark mode and home page animations
- [x] About, Community Guidelines, Privacy and Terms pages
- [x] Security fixes: hide comments and likes of private posts, block every write for blocked users, lock the profile email, keep other users' email and phone private
- [x] Sharing posts: copy a link that opens the post

**Quality**
- [x] 171 unit tests (Vitest + React Testing Library) for components, hooks, route guards, schemas and services
- [x] Prettier formatting, checked in CI
- [x] CI pipeline (lint, formatting, tests, build) on every pull request
- [x] Automatic deployment to Vercel

---

## Tech stack

| Layer | Tools |
|---|---|
| UI | React 19, Chakra UI v3, React Router 7, Motion (animations), Fontsource (self-hosted fonts) |
| Forms | React Hook Form, Zod |
| Backend | Supabase: Postgres, Auth, Storage, Realtime |
| Testing | Vitest, React Testing Library |
| Tooling | Vite, ESLint, Prettier |
| CI/CD | GitHub Actions, Vercel |

## Architecture

```
pages/        smart: read the URL and context, call hooks, pass data down
  ↓
hooks/        state and requests (usePosts, usePostLikes, usePostModal, ...)
  ↓
services/     the only place that talks to Supabase; returns { data } or { error }
  ↓
Supabase      Postgres + Row Level Security, Auth, Storage, Realtime
```

- **Logic and view are split.** A component that has state, effects or requests keeps that logic in a hook next to it (`Feed.jsx` + `useFeed.js`, `CreatePostModal.jsx` + `useCreatePostForm.js`). The `.jsx` file only renders what the hook gives it. Components without logic (`LikeButton`, `RoleBadge`, `PostAuthor`, ...) are plain views that get everything through props.
- **The database is the real guard.** Route guards and disabled buttons are for a good user experience; every rule (who can read a private post, who can write, who is an admin) is also enforced by RLS, because the publishable key is public and anyone can call the API directly.
- **One shape for every service call.** Services return `{ data }` or `{ error }`, and database errors go through `failWith`, which logs the raw error and returns a message that is safe to show (`You don't have permission to do this.`). Supabase Auth errors are returned as they are, because their messages are already written for users.

### Key decisions

| Decision | Why |
|---|---|
| Supabase instead of a custom backend | Auth, Storage and Realtime are ready to use, so the work goes into the product and the database rules |
| Restrictive policies for blocked users | They add "and you are not blocked" to every write without rewriting the existing policies, and apply to admins too |
| `public_profiles` view for other users | `profiles` returns only your own row; everyone else is read through a view without email and phone |
| Security definer helpers (`is_admin()`, `is_blocked()`) | Policies on `profiles` that read `profiles` would otherwise recurse |
| Optimistic likes | The count changes instantly; it is rolled back with a message if saving fails, and a second click is ignored while the first one is saving |
| Search and sort in the URL | They survive a refresh and the link can be shared |
| Profile created by the client, not a trigger | Email and Google sign-ups both land on Complete Profile; if creating it fails, there is simply no row and the user is asked again |
| Delete media files before the post | The Storage policy checks the `post_media` row, which the post's cascade delete removes |

## Project structure

```
client/src/
├── pages/            route-level screens, each in its own folder
│   └── Feed/
│       ├── Feed.jsx          view
│       └── useFeed.js        logic
├── components/       UI components grouped by feature (posts, admin, auth, profile, sections, ui, ...)
│   └── posts/CreatePostModal/
│       ├── CreatePostModal.jsx
│       ├── useCreatePostForm.js
│       └── useCreatePostForm.test.js
├── layouts/          app navbar + content area, blocked-user banner
├── routes/           route guards (signed in, profile completed, guest only, admin only)
├── hooks/            hooks shared by several components (useAuth, useProfile, usePosts, usePostLikes, usePostModal, usePostActions, useFilePicker, ...)
├── services/         all Supabase calls
├── context/          auth, profile and notifications providers
├── schemas/          Zod validation schemas (they mirror the database CHECK constraints)
├── utils/            small pure helpers (dates, names, text, errors, toasts, post counts, search and sort)
├── config/           Supabase client, environment variables and the Chakra UI theme
├── content/          static texts for the info pages (About, Guidelines, Privacy, Terms)
├── assets/           logo and home page photos
└── test/             test setup and the renderWithProviders helper
supabase/
└── migrations/       SQL scripts for the database
.github/
└── workflows/        CI pipeline
```

- Every component lives in a folder with its own name, together with its logic hook and tests. Components are imported by their full path (`components/posts/FeedPostCard/FeedPostCard`).
- Tests live next to the file they test (`useCommentItem.js` → `useCommentItem.test.js`).
- Shared building blocks: `PageGrid` (the three-column page layout) and `PostList` (the list of post cards) are used by both the feed and user profiles.
- Colors always come from the theme (`colorPalette.*`, `coral.*`, `bg.*`, `fg.*`), never hard-coded, so every component works in both light and dark mode.

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

To get the first admin, sign up, then set `is_admin` to `true` on your row in **Table Editor → profiles**. After that, admins can give admin rights to others from the admin panel.

### 3. Run
```bash
npm run dev        # development server on http://localhost:5173
npm test           # unit tests in watch mode
npm run test:run   # unit tests once
npm run lint       # ESLint
npm run format     # format every file with Prettier
npm run format:check  # check the formatting (what CI runs)
npm run build      # production build
```

---

## CI/CD

```
pull request ──► GitHub Actions: install → lint → formatting → tests → build
             ──► Vercel: preview deployment with its own URL
merge to main ──► Vercel: production deployment (live demo)
```

- **CI** — [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request and every push to `main`.
- **Protected `main`** — changes reach `main` only through a pull request, and only when the CI check passes.
- **CD** — Vercel builds `client/` and deploys `main` to production and every pull request to a preview URL. [`client/vercel.json`](client/vercel.json) sends every path to `index.html` so routes like `/feed` work on refresh.

To deploy your own copy: import the repository in Vercel with **Root Directory** `client`, add the three `VITE_` environment variables (with `VITE_APP_URL` set to the deployed URL), and add `<deployed-url>/auth/callback` to the Supabase redirect URLs.

---

## Database

### Tables

Relationships:
- `auth.users` 1 → 1 `profiles`
- `profiles` 1 → N `posts`, `comments`, `post_likes`
- `posts` 1 → N `comments`, `post_likes`, `post_media`
- `comments` 1 → N `comments` (replies through `parent_comment_id`)
- `profiles` 1 → N `notifications` (as recipient and as actor)

Deleting a profile or a post deletes everything that belongs to it (`ON DELETE CASCADE`).

**profiles** — one per registered user; each user can read only their own row (admins can read all), everyone else is read through `public_profiles`
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK, references `auth.users` |
| `username` | text | unique, 4–32 characters, cannot be changed |
| `first_name` | text | 4–32 characters |
| `last_name` | text | 4–32 characters |
| `email` | text | unique, valid email format |
| `phone` | text | required |
| `avatar_url` | text | optional |
| `is_admin` | boolean | default `false`; only admins can change it |
| `is_blocked` | boolean | default `false`; only admins can change it |
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

**notifications** — created by database triggers, never by the client
| Column | Type | Rules |
|---|---|---|
| `id` | uuid | PK |
| `recipient_id` | uuid | who gets the notification, references `profiles`, cascade delete |
| `actor_id` | uuid | who liked or commented, references `profiles`, cascade delete |
| `type` | text | `post_like`, `post_comment` or `comment_reply` |
| `post_id` | uuid | references `posts`, cascade delete |
| `comment_id` | uuid | optional, references `comments`, cascade delete |
| `is_read` | boolean | default `false`; the only column users can update |
| `created_at` | timestamptz | default `now()` |

**Also:**
- `posts_with_comment_count` — view used by the home page lists; respects RLS
- `public_profiles` — read-only view with the public columns of every profile (`id`, `username`, `first_name`, `last_name`, `avatar_url`, `is_admin`, `created_at`); used for post and comment authors, notification actors and user profile pages
- `get_public_stats()` — returns the total number of posts and users for the home page
- `is_admin()` — tells whether the signed-in user is an admin; used by the admin policies, which let admins see every post and delete any post together with its media
- `is_blocked()` — tells whether the signed-in user is blocked; used by restrictive policies that deny every write for blocked users
- `post-media` — private Storage bucket, 50 MB per file, JPEG / PNG / WebP / GIF / MP4 / WebM
- `avatars` — public Storage bucket for profile photos, 10 MB per file, JPEG / PNG / WebP; users may upload, update and delete only files in their own `{userId}/` folder
- Notification triggers — a like notifies the post author (removed again on unlike), a comment notifies the post author, a reply notifies the author of the parent comment; nobody is notified about their own actions
- `notifications` and `profiles` are published to Supabase Realtime, so new notifications and block / unblock changes reach the browser without a refresh

### Scripts

| File | Creates |
|---|---|
| `001_tables.sql` | tables and field constraints |
| `002_views_and_functions.sql` | view and function |
| `003_indexes.sql` | indexes on foreign key columns |
| `004_rls_policies.sql` | Row Level Security policies |
| `005_storage.sql` | `post-media` bucket and its access policies |
| `006_notifications.sql` | `notifications` table, its RLS policies, triggers and Realtime publication |
| `007_avatars_storage.sql` | `avatars` bucket and its access policies |
| `008_admin.sql` | `is_admin()` function and admin policies: view all posts and their media, delete any post and its media files |
| `009_private_post_visibility.sql` | comments and likes follow the visibility of their post |
| `010_block_all_writes.sql` | `is_blocked()` function and restrictive policies that deny every write for blocked users |
| `011_profiles_realtime.sql` | publishes `profiles` to Realtime |
| `012_profile_email_lock.sql` | the profile email must match the signed-in account and cannot be changed |
| `013_public_profiles.sql` | `public_profiles` view; `profiles` is readable only by its owner and admins |
| `014_profiles_select_without_recursion.sql` | rewrites the `profiles` select policy without subqueries, which avoids "infinite recursion detected in policy" in the update policies |

Run the files in order on an empty Supabase project. `007_avatars_storage.sql` is also safe to run again on an existing project, because it creates or updates the bucket and adds its policies only when they don't exist yet. Every later change goes into a new numbered file (`015_...sql`, etc.) in the same pull request as the code that needs it.