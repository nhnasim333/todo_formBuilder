import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import TodosPage from "../pages/TodosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: "todos",
        element: <TodosPage />,
      },
    ],
  },
]);

export default router;
