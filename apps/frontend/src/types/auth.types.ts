export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface User {
  _id: string

  name: string

  email: string

  role:
    | "ADMIN"
    | "ENTREPRENEUR"
    | "INVESTOR"
    | "STUDENT"

  avatar: string

  isVerified: boolean

  bio?: string

  college?: string

  github?: string

  linkedin?: string

  skills?: string[]

  createdAt: string

  updatedAt: string
}

export interface AuthResponse {
  success: boolean

  message: string

  data: {
    user: User

    accessToken: string
  }
}

export interface RefreshTokenResponse {
  success: boolean

  message: string

  data: {
    accessToken: string
  }
}