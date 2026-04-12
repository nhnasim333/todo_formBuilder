# React Assignment: Todo List + Dynamic Form Builder

This project implements two independent features using React + TypeScript:

- Todo List
- Dynamic Form Builder

## Tech Stack

- React (functional components + hooks)
- React Router
- React Query
- TypeScript
- CSS Modules

## Routes

- `/todos` -> Todo List
- `/form-builder` -> Build form configuration
- `/form-preview` -> Preview and submit dynamic form

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/nhnasim333/todo_formBuilder
cd todo_formBuilder
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

## Approach

### 1) Todo List

- Data fetching:
  - Todos: `https://jsonplaceholder.typicode.com/todos`
  - Users: `https://jsonplaceholder.typicode.com/users`
- Mapped `userId` from todos to user name.
- Added filtering by:
  - User
  - Status (Completed/Pending)
  - Search by title
- Added client-side pagination.
- Persisted Todo UI state (filters, search, pagination) in localStorage so state remains when navigating across routes.

### 2) Dynamic Form Builder

- Built a form builder to add multiple fields dynamically.
- Each field supports:
  - Label
  - Type (`text`, `number`, `textarea`, `select`)
  - Options for `select`
- Saved form configuration in localStorage.

### 3) Form Preview

- Loaded saved form configuration from localStorage.
- Rendered dynamic form fields based on configured types.
- On submit, logs submitted values to the console.
