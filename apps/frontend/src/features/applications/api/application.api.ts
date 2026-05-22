import api from "../../../lib/axios"

export const applyJob = async (payload: {
  job: string
  coverLetter: string
}) => {
  const response = await api.post("/applications", payload)

  return response.data
}

export const uploadResume = async (
  applicationId: string,
  resume: File
) => {
  const formData = new FormData()

  formData.append("resume", resume)

  const response = await api.patch(
    `/applications/${applicationId}/resume`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

export const getMyApplications = async () => {
  const response = await api.get("/applications/me")

  return response.data
}

export const getApplicationsByJob = async (jobId: string) => {
  const response = await api.get(`/applications/job/${jobId}`)

  return response.data
}

export const updateApplicationStatus = async (
  applicationId: string,
  status: "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED"
) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    {
      status,
    }
  )

  return response.data
}