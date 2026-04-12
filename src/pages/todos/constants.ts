import type { TodoUiState } from "./types";

export const TODO_STORAGE_KEY = "todos_ui_state";

export const DEFAULT_TODO_UI_STATE: TodoUiState = {
  selectedUserId: "all",
  status: "all",
  searchTerm: "",
  page: 1,
  pageSize: 10,
};
