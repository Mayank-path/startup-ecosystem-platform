import api from "../../../lib/axios"

import type {
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types"

export const registerUser = async (
  payload: RegisterPayload
) => {
  const response = await api.post(
    "/auth/register",
    payload
  )

  return response.data
}

export const loginUser = async (
  payload: LoginPayload
) => {
  const response = await api.post(
    "/auth/login",
    payload
  )

  return response.data
}

export const getCurrentUser =
  async () => {
    const response = await api.get(
      "/users/me"
    )

    return response.data
}

export const logoutUser =
  async () => {
    const response = await api.post(
      "/auth/logout"
    )

    return response.data
}

export const refreshAccessToken =
  async () => {
    const response = await api.post(
      "/auth/refresh-token"
    )

    return response.data
}

export const updateProfile = async (payload: {
  name?: string
  bio?: string
  college?: string
  github?: string
  linkedin?: string
  skills?: string[]
}) => {
  const response = await api.patch("/users/me", payload)

  return response.data
}

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()

  formData.append("avatar", file)

  const response = await api.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}