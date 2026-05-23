import { useEffect, useState } from "react"

import { getJobs } from "../api/job.api"

import JobCard from "../components/JobCard"

import type { Job } from "../types/job.types"

import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"
import Input from "../../../components/ui/Input"
import Pagination from "../../../components/ui/Pagination"

function ExploreJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const jobsPerPage = 6

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await getJobs(
          currentPage,
          jobsPerPage,
          search
        )

        setJobs(response.data.jobs)
        setTotalPages(response.data.totalPages || 1)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [currentPage, search])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <ErrorState
          title="Unable to load jobs"
          description="Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <PageHeader
        title="Explore Jobs"
        subtitle="Discover startup jobs and internships."
      />

      <Input
        placeholder="Search jobs by title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {jobs.length === 0 ? (
        <EmptyState
          title={search ? "No matching jobs" : "No jobs available"}
          description={
            search
              ? "Try searching with a different title or location."
              : "New startup opportunities will appear here."
          }
        />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() =>
                setCurrentPage((prev) => prev - 1)
              }
              onNext={() =>
                setCurrentPage((prev) => prev + 1)
              }
            />
          )}
        </>
      )}
    </div>
  )
}

export default ExploreJobsPage