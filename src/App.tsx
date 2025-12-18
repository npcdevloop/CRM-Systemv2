import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error/Error";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";
import AuthPage from "./page/AuthPage";
import AuthLayoutPage from "./page/AuthLayoutPage";
import RegisterPage from "./page/RegisterPage";
import AxiosInterceptor from "./api/AxiosInterceptor";

const router = createBrowserRouter([
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
