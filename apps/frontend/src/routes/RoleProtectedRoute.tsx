import { Navigate } from "react-router-dom"

import { useAuthStore } from "../features/auth/store/auth.store"

interface Props {
  children: React.ReactNode
  allowedRoles: string[]
}

function RoleProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RoleProtectedRoute