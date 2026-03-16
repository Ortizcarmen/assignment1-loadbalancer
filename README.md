# Assignment 05 - Task Manager 🌸

Full-stack task manager application built with a monorepo structure.

## Tech Stack
- **Monorepo:** npm workspaces
- **Frontend:** Next.js deployed on Vercel
- **Backend:** Express.js + Prisma deployed on Render
- **Database:** PostgreSQL on Supabase
- **Secrets Management:** Doppler
- **API Documentation:** Swagger UI

## URLs

### 🌸 Frontend
https://assignment-05-frontend-beige.vercel.app

### ⚙️ Backend
https://assignment-05-backend-0xcd.onrender.com

> **Note:** The backend is hosted on Render's free tier. It may take 1-2 minutes to wake up on the first request.

### 📄 API Documentation (Swagger)
https://assignment-05-backend-0xcd.onrender.com/api-docs

> Here you can see all available endpoints and test them directly.

## Monorepo Structure
```
assignment-05/
├── frontend/     → Next.js app (deployed on Vercel)
├── backend/      → Express API + Prisma (deployed on Render)
└── package.json  → npm workspaces config
```

## Secrets Management (Doppler)
All environment secrets are managed through Doppler:
- `DATABASE_URL` → PostgreSQL connection string (Supabase)
- `DIRECT_URL` → Direct PostgreSQL connection string (Supabase)
- `PORT` → Backend port
- `NEXT_PUBLIC_API_URL` → Backend URL for frontend

Doppler was configured locally using the CLI:
```bash
doppler login
doppler setup
```

The same secrets are synced to Render and Vercel as environment variables.

## Migrations
Migrations are located in `backend/prisma/migrations/` and were applied using Prisma Migrate:
```bash
npx prisma migrate dev --name init
```

## Database Screenshot
![Database](docs/databasei.png)
