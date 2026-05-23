import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"

import {
  getJobsByStartup,
  deleteJob,
} from "../api/job.api"

import type { Job } from "../types/job.types"

function StartupJobsPage() {
  const { startupId } = useParams()

  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!startupId) return

        const response = await getJobsByStartup(startupId)

        setJobs(response.data)
      } catch (error) {
        console.log(error)
        setHasError(true)
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
    return <LoadingSpinner />
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <ErrorState
          title="Unable to load jobs"
          description="Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <PageHeader
        title="Startup Jobs"
        subtitle="Manage jobs posted by your startup."
        action={
          <Link to={`/startups/${startupId}/jobs/create`}>
            <Button>
              Create Job
            </Button>
          </Link>
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs posted yet"
          description="Create your first job posting to start receiving applicants."
          action={
            <Link to={`/startups/${startupId}/jobs/create`}>
              <Button>
                Create Job
              </Button>
            </Link>
          }
        />
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
                  <Link to={`/jobs/${job._id}`}>
                    <Button variant="secondary">
                      View Job
                    </Button>
                  </Link>

                  <Link to={`/jobs/${job._id}/edit`}>
                    <Button variant="secondary">
                      Edit
                    </Button>
                  </Link>

                  <Link to={`/jobs/${job._id}/applicants`}>
                    <Button>
                      View Applicants
                    </Button>
                  </Link>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    Delete
                  </Button>
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