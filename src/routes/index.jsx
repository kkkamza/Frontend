import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { CssBaseline } from "@mui/material"
import theme from "../theme"
import MainPage from "../pages/home"
import LoginPage from "../pages/login"
import SignupPage from "../pages/signup"
import PaymentPage from "../pages/payment"
import StoreDetailPage from "../pages/storeDetail"
import CreateStorePage from "../pages/storeCreate"

import Header from "../components/header"

import { RouterPath } from "./path"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: (
      <div>
        <Header/>
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
    ],
  },
])


const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default Routes
