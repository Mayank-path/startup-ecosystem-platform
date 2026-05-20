import { createBrowserRouter } from "react-router-dom"

import App from "../App"

import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import ProfilePage from "../features/auth/pages/ProfilePage"

import ProtectedRoute from "./ProtectedRoute"
import RoleProtectedRoute from "./RoleProtectedRoute"

import DashboardLayout from "../layouts/DashboardLayout"
import DashboardPage from "../pages/DashboardPage"

import ExploreStartupsPage from "../features/startups/pages/ExploreStartupsPage"
import StartupDetailsPage from "../features/startups/pages/StartupDetailsPage"
import CreateStartupPage from "../features/startups/pages/CreateStartupPage"
import MyStartupsPage from "../features/startups/pages/MyStartupsPage"
import EditStartupPage from "../features/startups/pages/EditStartupPage"

import ExploreJobsPage from "../features/jobs/pages/ExploreJobsPage"
import JobDetailsPage from "../features/jobs/pages/JobDetailsPage"

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
        path: "startups",
        element: <ExploreStartupsPage />,
      },

      {
        path: "startups/:id",
        element: <StartupDetailsPage />,
      },

      {
        path: "jobs",
        element: <ExploreJobsPage />,
      },

      {
        path: "jobs/:id",
        element: <JobDetailsPage />,
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

          {
            path: "startups/create",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <CreateStartupPage />
              </RoleProtectedRoute>
            ),
          },

          {
            path: "my-startups",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <MyStartupsPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "startups/:id/edit",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <EditStartupPage />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
])