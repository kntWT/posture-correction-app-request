# Posture Correction App Request

This repository is a request management web app for the posture correction app using Next.js + TypeScript + Firebase + SWR + Zod + Tailwind CSS, etc.
You can choose which of the configured at project root settings to use. (Note that data will not be registered to any host other than the selected one.)

## Main Features

- Login with Google Authentication
- Project Creation
- Backend Host Selection

## Directory Structure

```
app/
  ├─ src/
  │   ├─ app/         # Pages under Next.js App Router
  │   ├─ components/  # UI, forms, common components
  │   ├─ contexts/    # React Context (Auth, Project)
  │   ├─ lib/         # API clients, validation schemas, etc.
  │   ├─ configs/     # Backend host settings, etc.
  ├─ public/          # Static files
  ├─ package.json     # Dependency packages
  ├─ ...
```

## Setup Instructions

1. Install dependencies

```bash
pnpm install
```

2. Start development server

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Start with Docker

1. Create a `.env` file in the project root and describe the necessary environment variables
2. Start with the following command

```bash
docker compose up --build
```

## Main Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Firebase Auth
- SWR (API communication)
- react-hook-form + zod (Validation)
- Tailwind CSS, shadcn/ui, lucide-react (UI)

## Environment Variables

- Set appropriate environment variables referring to `env.d.ts`
  - You need to create a project on [Firebase](https://firebase.google.com/docs/guides/setup)
- Backend host options are defined in `app/src/configs/backend-host/backendHost.ts`. Please define it referring to `sample.ts` in the same directory.
  Please configure nginx to proxy the `baseUrl` set here.
  Also, be careful that type information will be incorrect if you do not attach `as const` at this time.
