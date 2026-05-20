import api from "../../../lib/axios"

export const applyJob = async (
  payload: {
    job: string
    coverLetter: string
  }
) => {
  const response = await api.post(
    "/applications",
    payload
  )

  return response.data
}

export const getMyApplications =
  async () => {
    const response = await api.get(
      "/applications/me"
    )

    return response.data
  }