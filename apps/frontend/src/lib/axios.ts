import axios from "axios"

import { useAuthStore } from "../features/auth/store/auth.store"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const token = useAuthStore.getState().accessToken
    const currentPath = window.location.pathname

    const isAuthPage =
      currentPath === "/login" ||
      currentPath === "/register"

    if (status === 401 && token && !isAuthPage) {
      useAuthStore.getState().logout()
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api