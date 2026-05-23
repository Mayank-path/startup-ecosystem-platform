import { Navigate } from "react-router-dom"

import { useAuthStore } from "../features/auth/store/auth.store"

import LoadingSpinner from "../components/ui/LoadingSpinner"

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
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <Navigate to="/login" />
    )
  }

  return children
}

export default ProtectedRoute