import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/ErrorPage";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";
import UsersTablePage from "./page/UsersTablePage";
import AuthPage from "./page/AuthPage";
import UserProfilePage from "./page/UserProfilePage";
import AxiosInterceptor from "./api/AxiosInterceptor";
import AuthLayoutPage from "./page/AuthLayoutPage";
import RegisterPage from "./page/RegisterPage";

const router = createBrowserRouter(

  [
    {
      path: '',
      element:
        <>
          <AxiosInterceptor />
          <LayoutPage />
        </>,
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
          element: <UsersTablePage />,
        },
        {
          path: 'admin/users/:id',
          element: <UserProfilePage />,
        },
      ]
    },
    {
      element: <AuthLayoutPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'auth',
          element: <AuthPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        }
      ]

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
