export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUser = {
  id: number;
  name: string;
};

export type TodoStatusFilter = "all" | "completed" | "pending";

export type TodoUiState = {
  selectedUserId: number | "all";
  status: TodoStatusFilter;
  page: number;
  pageSize: number;
};
