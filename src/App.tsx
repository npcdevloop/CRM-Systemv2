import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error";
import TodoListPage from "./page/TodoListPage";
import { Action as manipulateTasksAction } from "./api/api"

const router = createBrowserRouter([
  {
    path: '',
    element: <TodoListPage />,
    errorElement: <ErrorPage />,
    action: manipulateTasksAction,
    children: [
      {
        index: true,
        element: <TodoListPage />,
      },
      {
        path: 'inwork',
        element: <TodoListPage />,
      },
      {
        path: 'completed',
        element: <TodoListPage />,
      },
    ]
  }
])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App
