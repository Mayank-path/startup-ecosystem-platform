import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"

import {
  getJobsByStartup,
  deleteJob,
} from "../api/job.api"

import type { Job } from "../types/job.types"

function StartupJobsPage() {
  const { startupId } = useParams()

  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!startupId) return

        const response = await getJobsByStartup(startupId)

        setJobs(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [startupId])

  const handleDeleteJob = async (jobId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    )

    if (!confirmDelete) return

    try {
      await deleteJob(jobId)

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading jobs...</div>
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Startup Jobs
          </h1>

          <p className="mt-2 text-gray-600">
            Manage jobs posted by your startup.
          </p>
        </div>

        <Link
          to={`/startups/${startupId}/jobs/create`}
          className="rounded-xl bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800"
        >
          Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <p className="text-gray-600">
            No jobs posted yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <Card key={job._id}>
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {job.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {job.location}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="rounded-xl border px-4 py-2 text-sm font-medium"
                  >
                    View Job
                  </Link>

                  <Link
                    to={`/jobs/${job._id}/edit`}
                    className="rounded-xl border px-4 py-2 text-sm font-medium"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/jobs/${job._id}/applicants`}
                    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                  >
                    View Applicants
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDeleteJob(job._id)}
                    className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default StartupJobsPage