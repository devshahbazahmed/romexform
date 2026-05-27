# Romexform

A full-stack form builder application built as a Turborepo monorepo, featuring a Next.js frontend, tRPC API, and Drizzle ORM for type-safe database access.

---

## Project Structure

```
romexform/
├── apps/
│   ├── api/               # Backend API server
│   └── web/               # Next.js frontend application
│       └── app/
│           ├── (auth)/    # Authentication routes
│           ├── dashboard/forms/  # Forms dashboard
│           ├── form/[id]/ # Public form view
│           ├── forms/     # Forms listing
│           └── pricing/   # Pricing page
├── packages/
│   ├── database/          # Drizzle ORM schema, models & migrations
│   │   ├── drizzle/
│   │   ├── models/        # form.ts, form-field.ts, form-submission.ts, user.ts
│   │   └── schema.ts
│   ├── services/          # Shared business logic
│   │   ├── form/
│   │   ├── form-field/
│   │   ├── form-submission/
│   │   ├── oauth/
│   │   └── user/
│   ├── trpc/              # tRPC server & client setup
│   │   ├── client/
│   │   └── server/
│   │       └── routes/    # auth, form-field, form-submission, health
│   ├── eslint-config/
│   └── logger/
```

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Frontend     | [Next.js 14+](https://nextjs.org/) (App Router) |
| API Layer    | [tRPC](https://trpc.io/)                        |
| Database ORM | [Drizzle ORM](https://orm.drizzle.team/)        |
| Monorepo     | [Turborepo](https://turbo.build/)               |
| Language     | TypeScript                                      |
| Styling      | Tailwind CSS                                    |
| Auth         | OAuth                                           |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A supported database (PostgreSQL recommended with Drizzle)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/romexform.git
cd romexform

# Install dependencies
pnpm install
```

### Environment Variables

Copy the example env files and fill in your values:

```bash
cp packages/database/.env.example packages/database/.env
cp packages/services/.env.example packages/services/.env
```

Key variables to configure:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/romexform

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run only the web app
pnpm dev --filter=web

# Run only the API
pnpm dev --filter=api
```

The web app will be available at `http://localhost:3000`.

---

## Key Features

- **Form Builder** — Create and manage custom forms with multiple field types
- **Form Submissions** — Collect and view responses from submitted forms
- **Authentication** — OAuth-based user authentication
- **Dashboard** — Manage all your forms from a central dashboard
- **Public Form Links** — Share forms via unique URLs (`/form/[id]`)
- **Pricing** — Tiered plan support

---

## Demo Credentials

Use the following credentials to explore the app without signing up:

| Role  | Email               | Password      |
| ----- | ------------------- | ------------- |
| Admin | `shahbaz@gmail.com` | `shahbaz@123` |

> ⚠️ These are for demo/testing purposes only. Do not use these credentials in production.

---

## Available Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start all apps in development mode |
| `pnpm build`       | Build all apps and packages        |
| `pnpm lint`        | Lint all packages                  |
| `pnpm db:generate` | Generate Drizzle migrations        |
| `pnpm db:migrate`  | Apply pending migrations           |
| `pnpm db:studio`   | Open Drizzle Studio (DB GUI)       |

---

## Database Models

- **User** — Account information and auth details
- **Form** — Form metadata (title, settings, theme)
- **FormField** — Individual fields within a form (type, label, options)
- **FormSubmission** — Submitted responses linked to a form

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing code style and ensure all TypeScript types are properly defined.

---

## License

MIT © Shahbaz Ahmed Ansari
