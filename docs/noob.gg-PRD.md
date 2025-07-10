# noob.gg LFG System (MVP)

### TL;DR

noob.gg’s LFG Lobby system empowers gamers to effortlessly create, join,
and manage game sessions for top multiplayer titles. Designed for web
and a global audience, it brings together matchmaking, in-lobby chat,
and social connections—making it easier for players to find teammates,
make friends, and build their gaming community.

------------------------------------------------------------------------

## Goals

### Business Goals

- Achieve at least 2,000 user registrations within three months of MVP
  launch.

- Reach a weekly active user rate of 30%+ within the first quarter.

- Attain a minimum of 500 unique lobby creations in the first two
  months.

- Foster user engagement through high chat and friend-request activity.

- Build a stable foundation for rapid feature expansion and scalability.

### User Goals

- Quickly and easily find or create teams for Fortnite, CS2, League of
  Legends, Valorant, Rainbow Six Siege, and Minecraft.

- Seamlessly connect and chat with other players before and after
  joining lobbies.

- Build and manage a personal friends list for repeated play sessions.

- Join public lobbies instantly or request entry to private ones,
  maintaining control and privacy.

- Access the full experience through an intuitive, web-based interface.

### Non-Goals

- No monetization features in the MVP (no ads, no premium).

- No mobile application support (web only for launch).

- No support for games beyond the six stated titles at MVP launch.

------------------------------------------------------------------------

## User Stories

**Persona 1: Casual Gamer ("Eva")**

- As a gamer, I want to browse LFG lobbies for my favorite game, so that
  I can join a group quickly.

- As a gamer, I want to join a public lobby instantly, so that I can
  start playing without delay.

- As a gamer, I want to request to join private lobbies and receive
  confirmation, so that I can play with select groups.

**Persona 2: Lobby Owner ("Sam")**

- As a lobby creator, I want to set my lobby as public or private, so
  that I can control who joins.

- As a lobby owner, I want to receive notifications when users request
  access, so that I can accept or reject them easily.

- As a lobby owner, I want to chat with lobby members, so that I can
  coordinate easily before gameplay.

**Persona 3: Social Connector ("Mina")**

- As a user, I want to view profiles and send friend requests to other
  gamers, so I can build a network.

- As a user, I want to chat one-on-one with friends or group chat within
  a lobby.

- As a user, I want to view my active and past lobbies on my profile
  page to keep track of sessions.

------------------------------------------------------------------------

## Functional Requirements

- **Lobby Management (High Priority)**

  - Lobby creation for six supported games; users select game, set lobby
    name, and description.

  - Public lobbies: join instantly; visible to all.

  - Private lobbies: join via request/approval; not open to all.

  - Manages lobby size, owner, and participant list.

- **Game/Session Filters (High Priority)**

  - Filters by game, skill-level, language (optional), region/time zone,
    and open/closed lobbies.

- **Joining Process (High Priority)**

  - Public: direct join—user becomes member immediately.

  - Private: “request to join” triggers notification to lobby owner;
    owner approves or denies.

- **User Profiles & Friends (High Priority)**

  - User profile creation upon sign-up: nickname, avatar, list of games,
    bio (optional).

  - Add/remove friends; view friend list.

  - User profiles display friend status and recent activity.

- **Lobby & Friend Chat (High Priority)**

  - Text-based chat in lobbies (visible to members).

  - One-on-one direct chat with friends.

- **Notification System (High Priority)**

  - Email and/or in-app notifications for requests, approvals, friend
    requests, and messages.

- **Error Handling (Medium Priority)**

  - User-friendly error states for full lobbies, invalid links, failed
    actions, and connectivity issues.

- **Accessibility & Localization (Medium Priority)**

  - Support keyboard navigation, screen readers, high-contrast modes.

  - Unicode support for global chat and names; all UI in English.

------------------------------------------------------------------------

## User Experience

**Entry Point & First-Time User Experience**

- Users visit noob.gg on web and are greeted with a clean, visually
  appealing landing page showcasing supported games.

- Users can sign up with email or existing social login (e.g., Google,
  Discord).

- New users are prompted to set a nickname, select an avatar, list up to
  three favorite games, and write a short bio (optional).

- The onboarding flow recommends exploring active LFG lobbies or
  creating a new one.

**Core Experience**

- **Step 1:** Landing on the dashboard

  - Displays popular lobbies across the six games.

  - Header features game filters and "Create Lobby" button for quick
    access.

- **Step 2:** Browsing & Filtering Lobbies

  - Users filter by game, region, number of open spots, or skill level
    (if specified).

  - Lists show summary: game, lobby name, owner, members, and join type
    (public/private).

- **Step 3:** Joining Lobbies

  - Public Lobby: “Join” button immediately adds user to lobby;
    redirected to lobby chat.

  - Private Lobby: “Request to Join” sends notification to owner; user
    sees pending status.

  - Owner receives notification, approves/denies; user is updated
    instantly.

- **Step 4:** Lobby Participation

  - Lobby interface displays member list, chat box, lobby details, and a
    button to invite friends.

  - Real-time chat for coordination.

  - Lobby owner has option to kick participants, start session, or close
    lobby.

- **Step 5:** Profile & Social Features

  - Users view profiles by clicking names in lobbies or chat.

  - "Add Friend" initiates friend request; notification sent.

  - Accepted friends appear in user’s list; direct 1:1 chat unlocked.

- **Step 6:** Notifications & Messaging

  - Bell icon and inbox for requests, approvals, friend requests, and
    new messages.

**Advanced Features & Edge Cases**

- Lobby is full: “Lobby Full” message with suggested alternative open
  lobbies.

- Connection errors: clear instructions to retry or contact support.

- Duplicate friend requests: blocked with clear explanation.

- Denied join: polite notification and option to browse public lobbies.

- Leaving or being removed: User gets confirmation and info about next
  steps.

**UI/UX Highlights**

- Minimalist design with high contrast and readable fonts.

- Responsive layout for desktops and laptops.

- All action buttons are visually distinct and clearly labeled.

- Error and success states are visually prominent and written in plain
  English.

- Avatar and nickname help users quickly identify each other.

- All chat fields and profile inputs fully support Unicode.

------------------------------------------------------------------------

## Narrative

Eva, a 22-year-old gamer from Berlin, logs on to noob.gg with a single
goal: find teammates for a Friday night Valorant session. The platform’s
welcome screen invites her to set up her profile, where she selects
Valorant, fortifies her nickname, and personalizes her avatar. Browsing
the lobbies with game and region filters, Eva finds a “Chill Valorant
(EU)” lobby marked as public with two open slots. She clicks “Join” and
instantly enters the lively team chat, where players are sharing
strategies and scheduling their play.

With a few friendly messages, Eva bonds with other members and adds a
teammate as a friend. Once the game is launched, the group transitions
seamlessly to their match—having already built rapport and synchronized
their roles. After the session, Eva receives a friend request, starting
a new gaming friendship. Later, she creates her own lobby and is pinged
by new join requests, picking members who seem most active and positive.
With each match, Eva grows her network, coming back not only for the
games but the community she’s helped shape. For noob.gg, it’s proof that
connecting gamers with the right LFG system makes every session more
fun, social, and memorable.

------------------------------------------------------------------------

## Success Metrics

### User-Centric Metrics

### Business Metrics

### Technical Metrics

### Tracking Plan

- User registration, profile completion

- Lobby creation, join, and close events

- Friend request sent, accepted, denied

- Chat message sent (lobby & friend)

- Notifications sent and actioned

- Error and edge case occurrences

------------------------------------------------------------------------

## Technical Considerations

### Technical Needs

- **Frontend:** Responsive web app (HTML5/JS/CSS); core pages:
  dashboard, lobby list, lobby detail, chat, profiles, settings.

- **Backend:** Handles authentication, lobby/session management, chat
  (real-time, with delivery confirmation), friends/notifications,
  profile data.

- **APIs:** For user authentication, lobby CRUD
  (create/read/update/delete), messaging, friend system, notifications.

- **Extensible Data Model:** Lobby structure supports new game types and
  future expansions.

- **Localization:** Full Unicode support for all text fields;
  future-proofed for multi-language UI.

### Integration Points

- 3rd-party authentication (Google, Discord, or similar for MVP).

- Email or in-app notification service.

- (Future) Additional game integrations via standard interfaces.

### Data Storage & Privacy

- Secure storage for user data (hashed passwords, encrypted chat/friend
  data).

- Lobby and chat data retained for defined period (configurable,
  defaults to 30 days).

- Compliance with GDPR and other relevant regulations for international
  users.

### Scalability & Performance

- Designed to handle thousands of concurrent users and chat messages.

- Asynchronous processing for notifications and chat.

- Efficient lobby search and filtering to keep UI responsive.

### Potential Challenges

- Real-time communication reliability (latency, ordering, delivery).

- Edge case handling for lobby state changes (owners leaving, forced
  removals).

- International time zones and regional preferences for lobby grouping.

- Mitigating spam and abusive behavior in lobbies and chat.

------------------------------------------------------------------------

## Milestones & Sequencing

### Project Estimate

- Medium (~3–4 weeks from start to live MVP)

### Team Size & Composition

- Small team (3–5 people):

  - 1 Product Manager (requirements, metrics, testing)

  - 2–3 Engineers (frontend, backend, integrations)

  - 1 Designer (UI/UX, accessibility, wireframes)

  - (Optional: 1 QA/tester for major checkpoints)

### Suggested Phases

**1. Planning & Design (3 days)**

- Deliverables: Wireframes, user flows, requirements confirmed

- Dependencies: Stakeholder alignment, wireframe approval

**2. Core System Implementation (10 days)**

- Deliverables: User authentication, profile setup, lobby CRUD backend,
  MVP frontend dashboard

- Dependencies: Dev environment, API specs

**3. Social & Chat Features (8 days)**

- Deliverables: In-lobby chat, friend system, direct messaging,
  notifications

- Dependencies: Core backend API done

**4. User Experience & Polish (3 days)**

- Deliverables: Error handling, UI accessibility, mobile web QA,
  localization (Unicode)

- Dependencies: Core and chat features implemented

**5. Testing & Launch (5 days)**

- Deliverables: Internal QA, user acceptance testing, launch plan, first
  release live

- Dependencies: All features complete, test accounts

------------------------------------------------------------------------

## 📁 Project Structure

------------------------------------------------------------------------

## 🧑‍💻 Tech Stack Overview

Welcome to the noob.gg project. This section introduces the core
technologies we use and explains why each one was chosen. If you are
starting out or new to any of these tools, don’t worry—this overview
will help you understand where to focus and how to get up to speed as a
contributor.

### Frontend

**Next.js 15:**  
Our main frontend framework is Next.js version 15. This lets us build
the website using React, and also gives us performance features like
server-side rendering and easy routing. Most user interface work will be
done here.

**React 19:**  
We use React 19 as the underlying library for building user interfaces.
Understanding React is essential. If you are new, start by reading the
React documentation and experiment with components in our codebase.

**Tailwind CSS 4:**  
For styling, we use Tailwind CSS version 4. Tailwind makes designing
pages quicker because you apply style classes directly in your JSX code.
This keeps our CSS maintainable and consistent.

**shadcn:**  
shadcn provides ready-to-use UI components designed for use with
Tailwind and React. When you need modals, dropdowns, or other UI pieces,
check here first before building your own.

**TanStack Query and TanStack Table:**  
TanStack Query handles data fetching and caching from our backend.
TanStack Table is used for building tables and managing how we display
lists of data. Both help simplify complex state management around server
data.

**react-hook-form, zod, and @hookform/resolvers:**  
These libraries make it simple and reliable to build forms, capture
input, and validate data. Use them for any user input experiences to
ensure data is checked before processing.

**TRPC:**  
TRPC allows our frontend and backend to communicate using TypeScript,
without writing separate REST API endpoints. This keeps our code
type-safe and productive, and is a key part of how server logic connects
to the UI.

**motion:**  
motion is used to create simple and efficient animations. If you need to
make UI elements move, fade, or transition, use this library.

**lucide-icons:**  
We use lucide-icons for all consistent SVG iconography in the
application.

**next-intl:**  
next-intl handles internationalization and translations for our
frontend. This supports our global user base and makes it easy to update
text in multiple languages.

### Backend

**Turborepo:**  
We structure our repository as a monorepo using Turborepo. This allows
us to manage the frontend, backend, and any shared packages in one
place. It simplifies dependency management and makes collaboration
smooth.

**Node.js (Bun runtime):**  
We run our backend on Node.js, but with the Bun runtime, which is faster
and modern. Most backend scripts, API logic, and server code run in this
environment. If you are already familiar with Node.js, you are in the
right place.

**PostgreSQL 16:**  
All persistent data is stored in a PostgreSQL database. We use version
16, chosen for its robustness and reliability.

**Drizzle ORM:**  
Drizzle ORM lets us write type-safe queries and manage the database in
TypeScript. This makes our backend safer, less prone to error, and more
maintainable.

**RabbitMQ:**  
RabbitMQ is included for future background jobs and messaging. It will
help us scale features such as notifications or complex data processing
as the app grows.

**Redis:**  
Redis is used for caching and managing real-time data like sessions,
making frequently accessed information fast and easy to handle.

**Socket.IO:**  
To support real-time features like chat or lobby updates, we use
Socket.IO for real-time communication between users.

**R2 Object Storage (S3 compatible):**  
All image uploads and large files are stored in Cloudflare R2, which is
compatible with Amazon S3 tools. This gives us flexible, reliable
storage for user avatars and any media content.

**Keycloak:**  
Keycloak provides authentication and user management. This means it
manages logins, registrations, and permissions, and works well with
different identity providers.

**Auth.js 5:**  
Auth.js is the library that connects authentication into our Next.js
frontend. It handles user sessions and login integration, working
together with Keycloak where needed.

### How This Stack Supports Development

- Real-time interactions, lobby features, and chat are built using
  Socket.IO, PostgreSQL, and our modern frontend tools.

- User profiles and friend systems rely on our secure authentication
  with Keycloak and Auth.js, and data is managed with Drizzle and
  PostgreSQL.

- UI pieces are easy to develop and maintain using the combination of
  Next.js, React, Tailwind, shadcn components, and supporting libraries
  for forms, tables, and data fetching.

- Internationalization, performance, and code maintainability are baked
  in from the start.

### Advice for Junior Developers

1.  Start by learning React and Next.js. Practice reading and writing
    simple components, then move to more complex features.

2.  Experiment with Tailwind CSS in any of the UI files to get used to
    how styles are written in this project.

3.  If you are interested in backend work, look at how we use Drizzle
    ORM to interact with the database, and read up on how Bun works.

4.  Use the provided code examples and existing patterns before
    inventing new ones. Consistency helps the team move faster together.

5.  When in doubt, check the documentation linked above, or ask
    questions in issues or discussions—help is always available.

------------------------------------------------------------------------

## 🛠️ Technologies Used

### Backend (API)

- **Framework**: <a href="https://hono.dev/" target="_blank"
  rel="noopener noreferrer nofollow">Hono.js</a> - A fast and
  lightweight web framework

- **ORM**: <a href="https://orm.drizzle.team/" target="_blank"
  rel="noopener noreferrer nofollow">Drizzle ORM</a> - A modern
  TypeScript-based SQL query builder

- **Database**: PostgreSQL 16 (integrated with Drizzle ORM)

- **Other Libraries**:

  - @aws-sdk/client-s3: For interacting with AWS S3

  - dotenv: For managing environment variables

### Frontend (Web)

- **Framework**: <a href="https://nextjs.org/" target="_blank"
  rel="noopener noreferrer nofollow">Next.js 15</a> - A React-based
  framework with SSR and SSG capabilities

- **UI Library**: <a href="https://react.dev/" target="_blank"
  rel="noopener noreferrer nofollow">React</a>

- **Styling**: <a href="https://tailwindcss.com/" target="_blank"
  rel="noopener noreferrer nofollow">Tailwind CSS</a>

### 🛠️ Development Tools

- **Monorepo Management**:
  <a href="https://turbo.build/repo" target="_blank"
  rel="noopener noreferrer nofollow">Turborepo</a>

- **Package Manager**: <a href="https://bun.sh/" target="_blank"
  rel="noopener noreferrer nofollow">Bun</a>

- **TypeScript**: For static typing

- **ESLint**: For maintaining code quality and consistency

------------------------------------------------------------------------

## 🚀 Getting Started

This project is a monorepo managed using
<a href="https://turbo.build/repo" target="_blank"
rel="noopener noreferrer nofollow">Turborepo</a>. The package manager is
<a href="https://bun.sh/" target="_blank"
rel="noopener noreferrer nofollow">Bun</a>.

### 📋 Prerequisites

- Node.js (see the engines section in the main package.json for the
  recommended version)

- Bun (<a href="https://bun.sh/docs/installation" target="_blank"
  rel="noopener noreferrer nofollow">Installation Guide</a>)

- Docker (required for PostgreSQL database)

### 🐳 PostgreSQL Docker Container Setup Steps

1️⃣ Download PostgreSQL Docker Image

2️⃣ Create and Run PostgreSQL Container

🔧 Command Parameters Explanation:

<table style="min-width: 50px">
<tbody>
<tr>
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
&#10;<tr>
<td><p>-p 1453:5432</p></td>
<td><p>Port mapping. Maps host machine's port 1453 to PostgreSQL's
default port 5432 inside the container.</p></td>
</tr>
<tr>
<td><p>--name noobgg-postgres</p></td>
<td><p>Container name. This name can be used to manage the container
later.</p></td>
</tr>
<tr>
<td><p>-e POSTGRES_PASSWORD=123noobgg123++</p></td>
<td><p>Sets the password for PostgreSQL root user (postgres).</p></td>
</tr>
<tr>
<td><p>-d</p></td>
<td><p>Runs the container in detached mode (background).</p></td>
</tr>
<tr>
<td><p>postgres:16.9-alpine3.22</p></td>
<td><p>Docker image name and version to use.</p></td>
</tr>
</tbody>
</table>

🔌 Connection Information

<table style="min-width: 50px">
<tbody>
<tr>
<th><p>Parameter</p></th>
<th><p>Value</p></th>
</tr>
&#10;<tr>
<td><p>Host</p></td>
<td><p>localhost</p></td>
</tr>
<tr>
<td><p>Port</p></td>
<td><p>1453</p></td>
</tr>
<tr>
<td><p>Username</p></td>
<td><p>postgres</p></td>
</tr>
<tr>
<td><p>Password</p></td>
<td><p>123noobgg123++</p></td>
</tr>
<tr>
<td><p>Default Database</p></td>
<td><p>postgres</p></td>
</tr>
</tbody>
</table>

📝 Important Docker Commands

### 💻 Installation

1.  Clone the project repository:

2.  Install the dependencies:

### 🚀 Starting the Development Servers

This command will:

- Start the backend API on http://localhost:3000.

- Start the frontend Next.js application on http://localhost:3001.

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome! Please review the contributing guidelines (if
available) or support the project by opening an issue or submitting a
pull request.

------------------------------------------------------------------------

## 📄 License

This project is licensed under the Apache License. See the LICENSE file
for more details.

------------------------------------------------------------------------

## 👥 Contributors

A big thank you to all our friends who participated in our streams and
supported us during the development process! 🙏
