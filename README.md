# Source Spark

Source Spark is a full-stack app for discovering open-source projects and finding repositories that match your stack, skill level, and contribution goals.

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcryptjs

## Features

- Sign up, sign in, and protected dashboard routes
- Search and filter open-source projects
- View project details
- Seeded sample data for local development

## Project Structure

- backend/ - Express API, auth, project routes, and seed script
- frontend/ - React app with pages, components, and auth context

## Setup

### Backend

```bash
cd backend
npm install
```
Run the server: npm run dev
```
Frontend:
cd frontend
npm install
npm run dev
```
Seed Data
```
cd backend
npm run seed
```

API
```
Base URL: http://localhost:5000/api

GET /health
POST /auth/register
POST /auth/login
GET /auth/me
GET /projects
GET /projects/:id
Scripts
Backend
npm start
npm run dev
npm run seed
Frontend
npm run dev
npm run build
npm run lint
npm run preview
```
