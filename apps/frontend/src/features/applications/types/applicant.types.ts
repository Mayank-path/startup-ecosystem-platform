export interface Applicant {
  _id: string

  status:
    | "PENDING"
    | "REVIEWED"
    | "ACCEPTED"
    | "REJECTED"

  coverLetter: string

  resume: string

  createdAt: string

  student: {
    _id: string
    name: string
    email: string
    avatar: string
  }
}