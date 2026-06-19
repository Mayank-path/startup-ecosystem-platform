import { createBrowserRouter } from "react-router-dom"

import App from "../App"

import HomePage from "../pages/HomePage"
import DashboardPage from "../pages/DashboardPage"

import DashboardLayout from "../layouts/DashboardLayout"

import ProtectedRoute from "./ProtectedRoute"
import RoleProtectedRoute from "./RoleProtectedRoute"

import LoginPage from "../features/auth/pages/LoginPage"
import RegisterPage from "../features/auth/pages/RegisterPage"
import ProfilePage from "../features/auth/pages/ProfilePage"

import ExploreStartupsPage from "../features/startups/pages/ExploreStartupsPage"
import StartupDetailsPage from "../features/startups/pages/StartupDetailsPage"
import CreateStartupPage from "../features/startups/pages/CreateStartupPage"
import MyStartupsPage from "../features/startups/pages/MyStartupsPage"
import EditStartupPage from "../features/startups/pages/EditStartupPage"

import ExploreJobsPage from "../features/jobs/pages/ExploreJobsPage"
import JobDetailsPage from "../features/jobs/pages/JobDetailsPage"
import StartupJobsPage from "../features/jobs/pages/StartupJobsPage"
import CreateJobPage from "../features/jobs/pages/CreateJobPage"
import EditJobPage from "../features/jobs/pages/EditJobPage"

import MyApplicationsPage from "../features/applications/pages/MyApplicationsPage"
import ApplicantsPage from "../features/applications/pages/ApplicantsPage"

import InvestorWatchlistPage from "../features/investors/pages/InvestorWatchListPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
            path: "investors/watchlist",
            element: (
              <RoleProtectedRoute allowedRoles={["INVESTOR"]}>
                <InvestorWatchlistPage />
              </RoleProtectedRoute>
            ),
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
          {
            path: "applications",
            element: (
              <RoleProtectedRoute allowedRoles={["STUDENT"]}>
                <MyApplicationsPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "jobs/:jobId/applicants",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <ApplicantsPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "startups/:startupId/jobs",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <StartupJobsPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "startups/:startupId/jobs/create",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <CreateJobPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: "jobs/:id/edit",
            element: (
              <RoleProtectedRoute allowedRoles={["ENTREPRENEUR", "ADMIN"]}>
                <EditJobPage />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
])