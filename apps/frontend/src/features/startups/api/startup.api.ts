import api from "../../../lib/axios"

export const getStartups = async () => {
  const response = await api.get("/startups")

  return response.data
}

export const getStartupById = async (id: string) => {
    const response = await api.get(`/startups/${id}`)
  
    return response.data
}

export const createStartup = async (payload: {
    name: string
    tagline: string
    description: string
    industry: string
    fundingStage: string
    location: string
    website: string
    techStack: string[]
  }) => {
    const response = await api.post("/startups", payload)
  
    return response.data
}

export const getMyStartups = async () => {
    const response = await api.get("/startups/me")
  
    return response.data
}

export const updateStartup = async (
  id: string,
  payload: {
    name?: string
    tagline?: string
    description?: string
    industry?: string
    fundingStage?: string
    location?: string
    website?: string
    techStack?: string[]
  }
) => {
  const response = await api.patch(`/startups/${id}`, payload)

  return response.data
}

export const deleteStartup = async (id: string) => {
  const response = await api.delete(`/startups/${id}`)

  return response.data
}

export const uploadStartupLogo = async (
  id: string,
  file: File
) => {
  const formData = new FormData()

  formData.append("logo", file)

  const response = await api.patch(
    `/startups/${id}/logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}