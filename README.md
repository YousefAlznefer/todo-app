# ✅ Todo App

A full-stack task manager built from scratch with Node.js, Express, and SQLite.


## Features

- Add, complete, and delete tasks
- Tasks are saved in a SQLite database and persist after restart
- Input validation on both client and server
- Automatic dark mode based on system settings
- Responsive design that works on mobile

## Tech Stack

**Backend:** Node.js, Express, better-sqlite3
**Frontend:** HTML, CSS, vanilla JavaScript

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Run Locally

```bash
git clone https://github.com/YousefAlznefer/todo-app.git
cd todo-app/backend
npm install
npm run dev
```

Then open http://localhost:3000

## What I Learned

[REST API design, middleware, SQL and preventing SQL injection, connecting a frontend to an API with fetch, debugging with browser DevTools.]