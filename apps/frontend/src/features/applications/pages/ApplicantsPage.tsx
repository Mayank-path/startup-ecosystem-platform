import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ApplicantCard from "../components/ApplicantCard"

import {
  getApplicationsByJob,
} from "../api/application.api"

import type { Applicant } from "../types/applicant.types"

function ApplicantsPage() {
  const { jobId } = useParams()

  const [applicants, setApplicants] =
    useState<Applicant[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    const fetchApplicants =
      async () => {
        try {
          if (!jobId) return

          const response =
            await getApplicationsByJob(
              jobId
            )

          setApplicants(response.data)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }

    fetchApplicants()
  }, [jobId])

  if (isLoading) {
    return (
      <div className="p-6">
        Loading applicants...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-4xl font-bold">
          Applicants
        </h1>

        <p className="mt-2 text-gray-600">
          Review applicants for this job.
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <p className="text-gray-600">
            No applicants yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {applicants.map(
            (applicant) => (
              <ApplicantCard
                key={applicant._id}
                applicant={
                  applicant
                }
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default ApplicantsPage