import { createBrowserRouter } from "react-router-dom"

import App from "../App"

import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import ProfilePage from "../features/auth/pages/ProfilePage"

import ProtectedRoute from "./ProtectedRoute"

import DashboardLayout from "../layouts/DashboardLayout"
import DashboardPage from "../pages/DashboardPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),

        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },

          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
])