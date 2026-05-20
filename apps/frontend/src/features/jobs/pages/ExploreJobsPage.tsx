import { useEffect, useState } from "react"

import { getJobs } from "../api/job.api"

import JobCard from "../components/JobCard"

import type { Job } from "../types/job.types"

function ExploreJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs()

        setJobs(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading jobs...</div>
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Explore Jobs
        </h1>

        <p className="mt-2 text-gray-600">
          Discover startup jobs and internships.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <p className="text-gray-600">
            No jobs available right now.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExploreJobsPage