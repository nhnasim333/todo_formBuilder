import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./TodosPage.module.css";
import { fetchTodos, fetchUsers } from "./todos/api";
import { DEFAULT_TODO_UI_STATE } from "./todos/constants";
import { loadTodoUiState, saveTodoUiState } from "./todos/uiState";
import type {
  TodoItem,
  TodoStatusFilter,
  TodoUiState,
  TodoUser,
} from "./todos/types";
import {
  buildUsersMap,
  matchesTodoFilters,
  paginateTodos,
} from "./todos/utils";

const TodosPage = () => {
  const [uiState, setUiState] = useState<TodoUiState>(loadTodoUiState);

  const {
    data: todosData,
    isLoading: isTodosLoading,
    isError: isTodosError,
  } = useQuery<TodoItem[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery<TodoUser[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const todos: TodoItem[] = todosData ?? [];
  const users: TodoUser[] = usersData ?? [];

  useEffect(() => {
    saveTodoUiState(uiState);
  }, [uiState]);

  const usersMap = useMemo(() => {
    return buildUsersMap(users);
  }, [users]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: TodoItem) =>
      matchesTodoFilters(
        todo,
        uiState.selectedUserId,
        uiState.status,
        uiState.searchTerm,
      ),
    );
  }, [todos, uiState.selectedUserId, uiState.status, uiState.searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTodos.length / uiState.pageSize),
  );

  useEffect(() => {
    if (uiState.page > totalPages) {
      setUiState((previous) => ({
        ...previous,
        page: totalPages,
      }));
    }
  }, [uiState.page, totalPages]);

  const paginatedTodos = useMemo(() => {
    return paginateTodos(filteredTodos, uiState.page, uiState.pageSize);
  }, [filteredTodos, uiState.page, uiState.pageSize]);

  const handleUserFilterChange = (value: string) => {
    setUiState((previous) => ({
      ...previous,
      selectedUserId: value === "all" ? "all" : Number(value),
      page: 1,
    }));
  };

  const handleStatusFilterChange = (value: TodoStatusFilter) => {
    setUiState((previous) => ({
      ...previous,
      status: value,
      page: 1,
    }));
  };

  const handleSearchChange = (value: string) => {
    setUiState((previous) => ({
      ...previous,
      searchTerm: value,
      page: 1,
    }));
  };

  const resetFilters = () => {
    setUiState((previous) => ({
      ...previous,
      ...DEFAULT_TODO_UI_STATE,
    }));
  };

  const hasLoadingState = isTodosLoading || isUsersLoading;
  const hasErrorState = isTodosError || isUsersError;

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo List</h1>
          <p className={styles.subtitle}>
            Filter todos by user and status, then move across pages.
          </p>
        </header>

        <div className={styles.controls}>
          <label className={styles.control}>
            <span>Search</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Search by title"
              value={uiState.searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
            />
          </label>

          <label className={styles.control}>
            <span>User</span>
            <select
              value={uiState.selectedUserId}
              onChange={(event) => handleUserFilterChange(event.target.value)}
            >
              <option value="all">All users</option>
              {users.map((user: TodoUser) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.control}>
            <span>Status</span>
            <select
              value={uiState.status}
              onChange={(event) =>
                handleStatusFilterChange(event.target.value as TodoStatusFilter)
              }
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </label>

          <button
            className={styles.resetButton}
            onClick={resetFilters}
            type="button"
          >
            Reset
          </button>
        </div>

        {hasLoadingState && <p className={styles.message}>Loading todos...</p>}

        {hasErrorState && (
          <p className={styles.error}>
            Something went wrong while loading todos. Please refresh.
          </p>
        )}

        {!hasLoadingState && !hasErrorState && (
          <>
            <div className={styles.summary}>
              Showing {paginatedTodos.length} of {filteredTodos.length} filtered
              todos
            </div>

            <ul className={styles.todoList}>
              {paginatedTodos.map((todo: TodoItem) => (
                <li key={todo.id} className={styles.todoItem}>
                  <div className={styles.todoTitle}>{todo.title}</div>
                  <div className={styles.metaRow}>
                    <span
                      className={`${styles.badge} ${
                        todo.completed ? styles.done : styles.pending
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                    <span className={styles.userName}>
                      {usersMap.get(todo.userId) ?? "Unknown user"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {filteredTodos.length === 0 && (
              <p className={styles.message}>
                No todos match the selected filters.
              </p>
            )}

            <div className={styles.pagination}>
              <button
                type="button"
                onClick={() =>
                  setUiState((previous) => ({
                    ...previous,
                    page: Math.max(1, previous.page - 1),
                  }))
                }
                disabled={uiState.page === 1}
              >
                Previous
              </button>

              <span>
                Page {uiState.page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setUiState((previous) => ({
                    ...previous,
                    page: Math.min(totalPages, previous.page + 1),
                  }))
                }
                disabled={uiState.page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default TodosPage;
