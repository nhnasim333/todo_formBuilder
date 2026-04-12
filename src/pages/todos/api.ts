import type { TodoItem, TodoUser } from "./types";

export const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json() as Promise<TodoItem[]>;
};

export const fetchUsers = async (): Promise<TodoUser[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json() as Promise<TodoUser[]>;
};
