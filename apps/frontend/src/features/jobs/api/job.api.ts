import api from "../../../lib/axios"

export const getJobs = async (
  page = 1,
  limit = 6,
  search = "",
  sort="newest"
) => {
  const response = await api.get("/jobs", {
    params: {
      page,
      limit,
      search,
      sort,
    },
  })

  return response.data
}

export const getJobById = async (id: string) => {
  const response = await api.get(`/jobs/${id}`)

  return response.data
}

export const getJobsByStartup = async (startupId: string) => {
  const response = await api.get(`/jobs/startup/${startupId}`)

  return response.data
}

export const createJob = async (payload: {
  startup: string
  title: string
  description: string
  roleType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT"
  location: string
  skillsRequired: string[]
  salary?: string
  applicationDeadline?: string
}) => {
  const response = await api.post("/jobs", payload)

  return response.data
}

export const updateJob = async (
  id: string,
  payload: any
) => {
  const response = await api.patch(`/jobs/${id}`, payload)

  return response.data
}

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/jobs/${id}`)

  return response.data
}