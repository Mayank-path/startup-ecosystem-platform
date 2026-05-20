import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"

import { getJobById } from "../api/job.api"

import type { Job } from "../types/job.types"

import ApplyJobForm from "../../applications/components/ApplyJobForm"

import { useAuthStore } from "../../auth/store/auth.store"

function JobDetailsPage() {
  const { id } = useParams()

  const user = useAuthStore((state) => state.user)

  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return

        const response = await getJobById(id)

        setJob(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (isLoading) {
    return <div className="p-6">Loading job...</div>
  }

  if (!job) {
    return <div className="p-6">Job not found</div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Card>
        <div className="flex items-start gap-4">
          {job.startup.logo ? (
            <img
              src={job.startup.logo}
              alt={job.startup.name}
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 text-2xl font-bold">
              {job.startup.name.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold">
              {job.title}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {job.startup.name}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
                {job.roleType.replace("_", " ")}
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
                {job.location}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">
          About the Role
        </h2>

        <p className="leading-7 text-gray-700">
          {job.description}
        </p>
      </Card>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">
          Skills Required
        </h2>

        <div className="flex flex-wrap gap-3">
          {job.skillsRequired.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {job.salary && (
        <Card>
          <h2 className="mb-2 text-2xl font-bold">
            Compensation
          </h2>

          <p className="text-lg font-semibold text-green-600">
            {job.salary}
          </p>
        </Card>
      )}

      <Card>
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold">
              Interested in this role?
            </h2>

            <p className="mt-1 text-gray-600">
              Apply and connect with the startup.
            </p>
          </div>

          {user?.role === "STUDENT" ? (
            <ApplyJobForm jobId={job._id} />
          ) : user ? (
            <div className="rounded-xl border bg-gray-50 px-5 py-4 text-sm text-gray-600">
              Only students can apply for jobs.
            </div>
          ) : (
            <div className="rounded-xl border bg-gray-50 px-5 py-4 text-sm text-gray-600">
              Please login as a student to apply.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default JobDetailsPage