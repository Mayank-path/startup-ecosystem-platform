import { useEffect } from "react"

import {
  getCurrentUser,
  refreshAccessToken,
} from "../api/auth.api"

import { useAuthStore } from "../store/auth.store"

export const useAuthBootstrap = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading)

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const tokenResponse = await refreshAccessToken()

        const token = tokenResponse.data.accessToken

        setAccessToken(token)

        const userResponse = await getCurrentUser()

        setUser(userResponse.data)
      } catch {
        setUser(null)
        setAccessToken(null)
      } finally {
        setAuthLoading(false)
      }
    }

    bootstrap()
  }, [setUser, setAccessToken, setAuthLoading])
}