export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string

  role:
    | "STUDENT"
    | "ENTREPRENEUR"
    | "INVESTOR"
    | "FREELANCER"

  password: string
  confirmPassword: string
}

export interface User {
  _id: string
  name: string
  email: string

  role:
    | "ADMIN"
    | "STUDENT"
    | "ENTREPRENEUR"
    | "INVESTOR"
    | "FREELANCER"

  avatar: string

  bio?: string
  college?: string
  github?: string
  linkedin?: string

  skills?: string[]

  isVerified: boolean
}