import { create } from "zustand"

import type {
  User,
} from "../types/auth.types"

interface AuthState {
  user: User | null

  accessToken: string | null

  isAuthLoading: boolean

  setUser: (
    user: User | null
  ) => void

  setAccessToken: (
    token: string | null
  ) => void

  setAuthLoading: (
    value: boolean
  ) => void

  logout: () => void
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    accessToken: null,

    isAuthLoading: true,

    setUser: (user) =>
      set({ user }),

    setAccessToken: (
      token
    ) =>
      set({
        accessToken: token,
      }),

    setAuthLoading: (
      value
    ) =>
      set({
        isAuthLoading: value,
      }),

    logout: () =>
      set({
        user: null,
        accessToken: null,
        isAuthLoading: false,
      }),
  }))