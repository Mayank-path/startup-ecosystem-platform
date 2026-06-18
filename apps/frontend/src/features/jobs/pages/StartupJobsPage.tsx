import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"

import { getJobsByStartup, deleteJob } from "../api/job.api"

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
    const confirmDelete = window.confirm("Are you sure you want to delete this job?")
    if (!confirmDelete) return

    try {
      await deleteJob(jobId)
      setJobs((prev) => prev.filter((job) => job._id !== jobId))
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (hasError) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ErrorState title="Unable to load jobs" description="Please try again later." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
      <PageHeader
        title="Job Management"
        subtitle="Create roles, update openings, and review applicants for this startup."
        action={
          <Link to={`/startups/${startupId}/jobs/create`}>
            <Button>Post New Job</Button>
          </Link>
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs posted yet"
          description="Post your first role to start receiving applications."
          action={
            <Link to={`/startups/${startupId}/jobs/create`}>
              <Button>Post New Job</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <Card key={job._id} className="transition hover:-translate-y-1 hover:border-[#6366F1]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-[#F8FAFC]">{job.title}</h2>
                    <span className="rounded-full border border-[#6366F1]/30 bg-[#6366F1]/15 px-3 py-1 text-xs font-medium text-[#F8FAFC]">
                      {job.roleType.replace("_", " ")}
                    </span>
                  </div>

                  <p className="mt-2 text-[#94A3B8]">{job.location}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill) => (
                      <span key={skill} className="rounded-full border border-slate-700 bg-[#0F172A] px-3 py-1 text-xs text-[#94A3B8]">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {job.salary && (
                    <p className="mt-5 text-sm text-[#94A3B8]">
                      Salary: <span className="font-semibold text-[#F59E0B]">{job.salary}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={`/jobs/${job._id}`}>
                    <Button variant="secondary">Preview</Button>
                  </Link>

                  <Link to={`/jobs/${job._id}/edit`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>

                  <Link to={`/jobs/${job._id}/applicants`}>
                    <Button>Review Applicants</Button>
                  </Link>

                  <Button type="button" variant="danger" onClick={() => handleDeleteJob(job._id)}>
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