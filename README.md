# API inscription/authentification

API Express + TypeScript + Prisma structuree comme un projet Nest: modules,
controllers, services, DTO, guard JWT et middlewares globaux.

## Installation

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

L'API demarre sur `http://localhost:3000`.

## Endpoints

### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "name": "User"
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

### Current user

```http
GET /api/v1/auth/me
Authorization: Bearer <accessToken>
```

```http
GET /api/v1/users/me
Authorization: Bearer <accessToken>
```

## Structure

```text
src/
  common/
    errors/
    middlewares/
    utils/
    validation/
  config/
  database/
  modules/
    auth/
      dto/
      guards/
      types/
    users/
      dto/
```

Change `JWT_SECRET` before using this API outside local development.
