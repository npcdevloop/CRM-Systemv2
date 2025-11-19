import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error/Error";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";

const router = createBrowserRouter([
  {
    path: '',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoListPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ]
  },
])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App
