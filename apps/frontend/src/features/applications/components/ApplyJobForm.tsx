import { useState } from "react"

import Button from "../../../components/ui/Button"
import { applyJob } from "../api/application.api"
import api from "../../../lib/axios"

interface Props {
  jobId: string
}

function ApplyJobForm({ jobId }: Props) {
  const [coverLetter, setCoverLetter] = useState("")
  const [resume, setResume] = useState<File | null>(null)

  const [isApplying, setIsApplying] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsApplying(true)
      setSuccessMessage("")
      setErrorMessage("")

      const response = await applyJob({
        job: jobId,
        coverLetter,
      })

      if (resume) {
        const formData = new FormData()

        formData.append("resume", resume)

        await api.patch(
          `/applications/${response.data._id}/resume`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      }

      setSuccessMessage("Application submitted successfully")
      setCoverLetter("")
      setResume(null)
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Unable to apply")
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <form onSubmit={handleApply} className="space-y-4">
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write a short cover letter"
        className="min-h-[140px] w-full rounded-xl border p-4 outline-none"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Resume PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      {resume && (
        <p className="text-sm text-gray-500">
          Selected: {resume.name}
        </p>
      )}

      {successMessage && (
        <p className="text-sm font-medium text-green-600">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={isApplying}
        className="w-full"
      >
        {isApplying ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}

export default ApplyJobForm