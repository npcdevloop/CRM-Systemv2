import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/Error/Error";
import TodoListPage from "./page/TodoListPage";
import ProfilePage from "./page/ProfilePage";
import LayoutPage from "./page/LayoutPage";
import UsersTablePage from "./page/UsersTablePage";
import AuthPage from "./page/AuthPage";
import UserProfilePage from "./page/UserProfilePage";
import AxiosInterceptor from "./api/AxiosInterceptor";

/* import AxiosInterceptor from "./api/AxiosInterceptor"; */

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
      path: 'auth',
      element: <AuthPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    /*   {
        element: <AxiosInterceptor/>
      } */
  ])

function App() {
  return (

    <RouterProvider router={router} />

  )
}

export default App
