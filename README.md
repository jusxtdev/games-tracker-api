# Game Tracker API

Backend API for tracking games, status changes, reviews, and a small personal stats dashboard.

## Why this exists
I built this as a practical backend project to get hands-on with Express + Postgres + Drizzle and keep the scope tight enough to actually finish.

The use case is straightforward: keep a personal game list, update progress (`WANT`, `PLAYING`, `COMPLETED`, etc.), add reviews after finishing games, and fetch summary stats for a dashboard.

## Overview
- Runtime: Node.js (ES modules)
- Framework: Express
- Database: PostgreSQL + Drizzle ORM
- Validation: Zod
- Auth: JWT Bearer tokens
- API docs: `swagger-autogen` + Swagger UI

Local API base URL: `http://localhost:3000/api`

Swagger UI: `http://localhost:3000/api-docs`

## Data model
Three main tables:

- `users`: username, email, hashed password
- `games`: title, genre, platform, releaseYear, coverURL, status, userId
- `reviews`: rating (1-10), review_text, gameId, userId

Status enum values:
`PLAYING`, `COMPLETED`, `DROPPED`, `WANT`, `ONHOLD`

## Setup
### 1. Install
```bash
npm install
```

### 2. Environment variables
Create `.env` in project root:

```env
DATABASE_URL="postgres://<user>:<password>@localhost:5432/<db>?schema=public"
JWT_SECRET="replace-with-your-secret"
PORT=3000
```

`PORT` is optional; default is `3000`.

### 3. Create/sync schema
`drizzle.config.js` points to `src/db/db.schema.js`.

Quick sync:
```bash
npx drizzle-kit push
```

Migration flow:
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Run locally
```bash
npm run dev
```

This does two things:
- regenerates `src/swagger-output.json`
- starts the API with `nodemon`

For non-watch mode:
```bash
npm start
```

## Scripts
From `package.json`:

- `npm run swagger` -> generate Swagger JSON
- `npm run dev` -> swagger generate + dev server
- `npm run build` -> swagger generate + `drizzle-kit push`
- `npm start` -> run API

## Typical usage flow
1. Register account.
2. Login and grab JWT.
3. Create games.
4. Mark a game as `COMPLETED`.
5. Add/update review for that game.
6. Fetch `/api/stats`.

## Auth
Protected routes require:

```http
Authorization: Bearer <token>
```

JWT payload stores `username`; middleware resolves current `userId` from DB.

## Endpoints
### Health
`GET /api/`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh` (protected)

### Games (protected)
- `POST /api/games`
- `GET /api/games`
  Query params: `genre`, `status`, `platform`, `sort` (`rating` or `dateAdded`), `order` (`asc` or `desc`)
- `GET /api/games/:id`
- `PUT /api/games/:id`
- `DELETE /api/games/:id`

### Reviews (protected)
- `POST /api/games/:id/reviews` (only if game is `COMPLETED`)
- `PUT /api/games/:id/reviews`
- `DELETE /api/games/:id/reviews`

### Stats (protected)
- `GET /api/stats`

Returns `overview`, `reviewStats`, `thisYear`, and `topGames`.

## Quick curl example
```bash
# register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"sam","email":"sam@example.com","password":"secret123"}'

# login
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sam","password":"secret123"}' | jq -r '.token')

# add game
curl -X POST http://localhost:3000/api/games \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Celeste","genre":"Platformer","status":"PLAYING"}'
```

## Validation notes
- username: min 2 chars
- password: min 4 chars
- game title: min 3 chars
- review rating: integer 1-10
- status input is normalized to uppercase before enum validation

## Deployment (Render)
This repo includes `render.yaml` with:

- one Node web service (`game-tracker-api`)
- one PostgreSQL database (`game-tracker-db`)
- build command: `npm install && npm run build`
- start command: `npm start`

Render env vars configured in `render.yaml`:
- `NODE_ENV=production`
- `DATABASE_URL` (from Render DB connection string)
- `JWT_SECRET` (generated)

## Gotchas / limitations
Real issues still present:

- Game title uniqueness is global (`games.title` unique), not per-user.
- Register checks duplicate username in code, but duplicate email handling is DB-constraint-only (no friendly mapping yet).
- Reviews are not unique per `(gameId, userId)` at DB level, so duplicate reviews are possible.
- `PUT`/`DELETE` for games and reviews currently return success even if no rows were changed.
- JWTs are signed without expiration.
- Stats `overview` sets missing statuses to `null` instead of `0`.
- Production CORS origin is currently a placeholder (`https://your-frontend-domain.com`) and should be replaced before real deployment.

## Project layout
```txt
src/
  controller/   # request handlers
  model/        # Drizzle DB queries
  routes/       # Express routers
  middleware/   # auth, validation, game-completion guard
  schemas/      # Zod request schemas
  db/           # schema + db client
```

## Swagger notes
Swagger output is generated into `src/swagger-output.json` from `swagger.docs.js`.

If you change routes, update `swagger.docs.js` too or docs will drift.
