import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"

import ApplicantCard from "../components/ApplicantCard"

import {
  getApplicationsByJob,
} from "../api/application.api"

import type { Applicant } from "../types/applicant.types"

function ApplicantsPage() {
  const { jobId } = useParams()

  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (!jobId) return

        const response = await getApplicationsByJob(jobId)

        setApplicants(response.data)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplicants()
  }, [jobId])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <ErrorState
          title="Unable to load applicants"
          description="Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
      <PageHeader
        title="Applicants"
        subtitle="Review applicants for this job."
      />
  
      {applicants.length === 0 ? (
        <EmptyState
          title="No applicants yet"
          description="Applicants will appear here once students apply for this job."
        />
      ) : (
        <div className="space-y-6">
          {applicants.map((applicant) => (
            <ApplicantCard
              key={applicant._id}
              applicant={applicant}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ApplicantsPage