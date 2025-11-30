import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error/Error";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";
import UsersPage from "./page/UsersPage";
import AuthPage from "./page/AuthPage";

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
      {
        path: 'users',
        element: <UsersPage />,
      },
    ]
  },
  {
    path: 'auth',
    element: <AuthPage />,
  },
])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App
