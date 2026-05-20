import { useState } from "react"

import Button from "../../../components/ui/Button"
import { applyJob } from "../api/application.api"

interface Props {
  jobId: string
}

function ApplyJobForm({ jobId }: Props) {
  const [coverLetter, setCoverLetter] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsApplying(true)
      setSuccessMessage("")
      setErrorMessage("")

      await applyJob({
        job: jobId,
        coverLetter,
      })

      setSuccessMessage("Application submitted successfully")
      setCoverLetter("")
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to apply"
      )
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
        {isApplying ? "Applying..." : "Submit Application"}
      </Button>
    </form>
  )
}

export default ApplyJobForm