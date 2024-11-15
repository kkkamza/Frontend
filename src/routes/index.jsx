import { CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import MainPage from "../pages/home"
import LoginPage from "../pages/login"
import PaymentPage from "../pages/payment"
import SignupPage from "../pages/signup"
import CreateStorePage from "../pages/storeCreate"
import StoreDetailPage from "../pages/storeDetail"
import theme from "../theme"

import Header from "../components/Header"

import SearchPage from "../pages/search"
import { RouterPath } from "./path"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: (
      <div>
        <Header />
        <div style={{ height: "54px", marginBottom: "10px" }}></div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: RouterPath.home,
        element: <MainPage />,
      },
      {
        path: RouterPath.login,
        element: <LoginPage />,
      },
      {
        path: RouterPath.signup,
        element: <SignupPage />,
      },
      {
        path: RouterPath.payment,
        element: <PaymentPage />,
      },
      {
        path: `${RouterPath.storeDetail}/:marketId`,
        element: <StoreDetailPage />,
      },
      {
        path: RouterPath.createStore,
        element: <CreateStorePage />,
      },
      {
        path: RouterPath.search,
        element: <SearchPage />,
      },
    ],
  },
])

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default Routes
