import { Navigate } from "react-router-dom"

import { useAuthStore } from "../features/auth/store/auth.store"

interface Props {
  children: React.ReactNode
}

function ProtectedRoute({
  children,
}: Props) {
  const user = useAuthStore(
    (state) => state.user
  )

  const isAuthLoading =
    useAuthStore(
      (state) =>
        state.isAuthLoading
    )

  if (isAuthLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <Navigate to="/login" />
    )
  }

  return children
}

export default ProtectedRoute