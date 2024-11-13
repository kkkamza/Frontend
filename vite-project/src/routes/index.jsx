import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/home"
import { RouterPath } from "./path"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
    ],
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
