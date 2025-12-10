import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error/Error";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";
import UsersPage from "./page/UsersPage";
import AuthPage from "./page/AuthPage";
import UserProfilePage from "./page/UserProfilePage";

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
      {
        path: 'admin/users/:id',
        element: <UserProfilePage />,
      },
    ]
  },
  {
    path: 'auth',
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App
