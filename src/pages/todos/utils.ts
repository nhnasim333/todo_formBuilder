import type { TodoItem, TodoStatusFilter, TodoUiState, TodoUser } from "./types";

export const buildUsersMap = (users: TodoUser[]): Map<number, string> => {
  return new Map<number, string>(users.map((user) => [user.id, user.name]));
};

export const matchesTodoFilters = (
  todo: TodoItem,
  selectedUserId: TodoUiState["selectedUserId"],
  status: TodoStatusFilter,
): boolean => {
  const userMatches = selectedUserId === "all" || todo.userId === selectedUserId;

  const statusMatches =
    status === "all" ||
    (status === "completed" && todo.completed) ||
    (status === "pending" && !todo.completed);

  return userMatches && statusMatches;
};

export const paginateTodos = (
  todos: TodoItem[],
  page: number,
  pageSize: number,
): TodoItem[] => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return todos.slice(start, end);
};
