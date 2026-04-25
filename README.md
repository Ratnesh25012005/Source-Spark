# Source Spark

A full-stack MERN application that helps developers discover open-source repositories to contribute to.

## Setup

1. Clone the repo.
2. Start MongoDB locally with `mongodb://127.0.0.1:27017` available.
3. `cd backend && npm install && node seed.js && node server.js`
4. `cd frontend && npm install && npm run dev`

## Environment

Create `backend/.env` from `backend/.env.example`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/source-spark
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

## Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Features

- JWT authentication
- Token guard on protected routes
- Filterable project discovery
- Dashboard with projects, sheet, and OSS program views
- Dark responsive UI
