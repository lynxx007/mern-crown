import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import HomeLayout from "./routes/HomeLayout";
import Error from "./routes/Error";
import Landing from "./routes/Landing";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import CategoriesPreview from "./views/CategoriesPreview";
import CategoryItem from "./routes/CategoryItem";
import WaitingForVerifications from "./routes/VerificationWaiting";
import VerifyEmail from "./routes/VerifyEmail";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";
import AuthRequired from "./components/AuthRequired";
import DashboardLayout from "./routes/Dashboard";
import ProfilePage from "./routes/Profile";
import { useAppDispatch } from "./hooks/reduxHooks";
import { useGetUserProfileQuery } from "./api/userApiSlice";
import { getUser } from "./app/auth/authSlice";
import { resetSuccess, setSuccess } from "./app/UI/uiSlice";
import Customers from "./routes/dashboard/Customers";
import Products from "./routes/dashboard/Products";
import Checkout from "./routes/Checkout";

import PaymentPage from "./routes/Payment";
import PaymentSuccessPage from "./routes/PaymentSuccess";
import Overview from "./routes/dashboard/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "shop",
        children: [
          {
            index: true,
            element: <CategoriesPreview />,
          },
          {
            path: ":category",
            element: <CategoryItem />,
          },
        ],
      },
      {
        path: "waitingForVerifications",
        element: <WaitingForVerifications />,
      },
      {
        path: "verifyEmail",
        element: <VerifyEmail />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "auth/reset_password",
        element: <ResetPassword />,
      },
      {
        path: "dashboard",
        element: (
          <AuthRequired allowedRoles={["Admin"]}>
            <DashboardLayout />
          </AuthRequired>
        ),
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "customers",
            element: (
              <AuthRequired allowedRoles={["Admin"]}>
                <Customers />
              </AuthRequired>
            ),
          },
          {
            path: "products",
            element: (
              <AuthRequired allowedRoles={["Admin"]}>
                <Products />
              </AuthRequired>
            ),
          },
        ],
      },
      {
        path: "checkout",
        element: (
          <AuthRequired allowedRoles={["User"]}>
            <Checkout />
          </AuthRequired>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthRequired allowedRoles={["User", "Admin"]}>
            <ProfilePage />
          </AuthRequired>
        ),
      },
      {
        path: "payment/:clientSecret",
        element: (
          <AuthRequired allowedRoles={["User", "Admin"]}>
            <PaymentPage />
          </AuthRequired>
        ),
      },
      {
        path: "payment/success",
        element: <PaymentSuccessPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getUser(data));
      dispatch(setSuccess(data.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
    }
  }, [dispatch, data, isSuccess]);
  return <RouterProvider router={router} />;
}

export default App;
