import { DEFAULT_TODO_UI_STATE, TODO_STORAGE_KEY } from "./constants";
import type { TodoUiState } from "./types";

const isValidTodoUiState = (value: unknown): value is TodoUiState => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<TodoUiState>;

  const validUserId =
    candidate.selectedUserId === "all" ||
    (typeof candidate.selectedUserId === "number" &&
      Number.isInteger(candidate.selectedUserId) &&
      candidate.selectedUserId > 0);

  const validStatus =
    candidate.status === "all" ||
    candidate.status === "completed" ||
    candidate.status === "pending";

  const validPage =
    typeof candidate.page === "number" &&
    Number.isInteger(candidate.page) &&
    candidate.page > 0;

  const validPageSize =
    typeof candidate.pageSize === "number" &&
    Number.isInteger(candidate.pageSize) &&
    candidate.pageSize > 0;

  return validUserId && validStatus && validPage && validPageSize;
};

export const loadTodoUiState = (): TodoUiState => {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);

    if (!raw) {
      return DEFAULT_TODO_UI_STATE;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isValidTodoUiState(parsed)) {
      return DEFAULT_TODO_UI_STATE;
    }

    return parsed;
  } catch {
    return DEFAULT_TODO_UI_STATE;
  }
};

export const saveTodoUiState = (state: TodoUiState): void => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state));
};
