import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import TodosPage from "../pages/TodosPage";
import FormBuilderPage from "../pages/FormBuilderPage";
import FormPreviewPage from "../pages/FormPreviewPage";

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
      {
        path: "form-builder",
        element: <FormBuilderPage />,
      },
      {
        path: "form-preview",
        element: <FormPreviewPage />,
      },
    ],
  },
]);

export default router;
