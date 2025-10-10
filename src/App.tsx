import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./page/Error";
import RootLayout, { Loader as MainNavigationLoader } from "./page/Root";
import AllPage, { Loader as AllLoaderPage } from "./page/All";
import InWorkPage, { Loader as InWorkLoaderPage } from "./page/InWork";
import CompletedPage, { Loader as CompletedLoaderPage } from "./page/Completed";
import { Action as addNewTask } from "./components/AddFieldForm";
import { Action as manipulateTasksAction } from "./components/Task"


const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'tasks',
    action: addNewTask,
    loader: MainNavigationLoader,
    children: [
      {
        index: true,
        element: <AllPage />,
        loader: AllLoaderPage,
        action: manipulateTasksAction,
      },
      {
        path: 'inwork',
        element: <InWorkPage />,
        loader: InWorkLoaderPage,
        action: manipulateTasksAction,
      },
      {
        path: 'completed',
        element: <CompletedPage />,
        loader: CompletedLoaderPage,
        action: manipulateTasksAction,
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


export async function AllLoader() {
  const response = await fetch('https://easydev.club/api/v1/todos');
  if (!response.ok) {
    throw Response.json({ message: "Could not fetch todos" }, { status: 500 });
  } else {
    const resData = await response.json()
    return resData
  }

}



