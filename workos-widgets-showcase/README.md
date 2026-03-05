# WorkOS Widgets Showcase

A comprehensive, easily testable repository demonstrating **every WorkOS widget** with live examples. Built for curious customers who want to explore and evaluate WorkOS Widgets before integrating.

## Widgets Covered

| Widget | Route | Description |
|--------|-------|-------------|
| **Users Management** | `/examples/users-management` | List, invite, and manage organization members with search, filtering, and bulk actions |
| **User Profile** | `/examples/user-profile` | Display and edit user details (name, email, profile picture, connected accounts) |
| **User Security** | `/examples/user-security` | Manage MFA options and password updates |
| **User Sessions** | `/examples/user-sessions` | View active sessions, sign out from individual or all other sessions |
| **Organization Switcher** | `/examples/organization-switcher` | Switch between organizations with automatic SSO/MFA handling |
| **User Settings (Combined)** | `/examples/user-settings` | Profile, Sessions, and Security in one tabbed settings page |

## Quick Start

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [WorkOS](https://workos.com) account with AuthKit configured

### Setup

1. **Clone and install**

   ```bash
   cd workos-widgets-showcase
   pnpm install
   ```

2. **Configure environment**

   Copy the example env file and add your WorkOS credentials:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your real credentials:

   - `WORKOS_API_KEY` – from [WorkOS Dashboard](https://dashboard.workos.com) → API Keys
   - `WORKOS_CLIENT_ID` – from WorkOS Dashboard → Configuration

   > **Note:** The build uses placeholder values from `.env.example` if `.env` is missing, so `pnpm build` succeeds without credentials. Replace with real values for the app to work.

3. **Configure AuthKit redirect**

   In the WorkOS Dashboard, add this redirect URI for your application:

   ```
   http://localhost:4040/auth/callback
   ```

4. **Run the app**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:4040](http://localhost:4040).

## Testing Each Widget

1. **Sign in** – Use the "Sign In with WorkOS" button on the home page.
2. **Widget Gallery** – After signing in, you’ll see cards for each widget.
3. **Try it** – Click "Try it" on any widget to open its dedicated example page.
4. **Interact** – Each example page includes a live widget you can use with your real organization and user.

### Requirements

- You must be signed in with WorkOS AuthKit.
- You must belong to an organization (widgets are organization-scoped).
- For **Users Management** and **Organization Switcher**, your WorkOS app may need the `widgets:users-table:manage` scope configured.

## Project Structure

```
workos-widgets-showcase/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with WorkOsWidgets provider
│   │   ├── page.tsx            # Widget Gallery (landing)
│   │   ├── auth/               # Auth callback & error handling
│   │   ├── examples/           # One page per widget
│   │   │   ├── users-management/
│   │   │   ├── users-management/
│   │   │   ├── user-profile/
│   │   │   ├── user-security/
│   │   │   ├── user-sessions/
│   │   │   ├── organization-switcher/
│   │   │   └── user-settings/
│   │   └── workos.ts           # WorkOS client
│   ├── lib/env.ts
│   ├── server-functions/       # Server actions (e.g. switch org)
│   └── middleware.ts           # AuthKit middleware
├── .env.example
├── package.json
└── README.md
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Auth:** WorkOS AuthKit for Next.js
- **Widgets:** `@workos-inc/widgets`
- **UI:** Radix UI Themes

## License

MIT
