import { useEffect, useState } from "react"

import { getJobs } from "../api/job.api"
import JobCard from "../components/JobCard"

import type { Job } from "../types/job.types"

import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"
import Input from "../../../components/ui/Input"
import Pagination from "../../../components/ui/Pagination"

import useDebounce from "../../../hooks/useDebounce"

function ExploreJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const debouncedSearch = useDebounce(search)
  const jobsPerPage = 6

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await getJobs(currentPage, jobsPerPage, debouncedSearch, sort)

        setJobs(response.data.jobs)
        setTotalPages(response.data.totalPages || 1)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
        setIsInitialLoading(false)
      }
    }

    fetchJobs()
  }, [currentPage, debouncedSearch, sort])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, sort])

  if (isInitialLoading) return <LoadingSpinner />

  if (hasError) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ErrorState title="Unable to load jobs" description="Please try again later." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Opportunities</p>
        <h1 className="mt-3 text-5xl font-black text-[#F8FAFC]">Find Opportunities</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#94A3B8]">Browse internships, full-time roles, freelance projects, and startup opportunities.</p>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-[#1E293B] p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_180px]">
          <Input placeholder="Search by title, startup, skill, or location..." value={search} onChange={(e) => setSearch(e.target.value)} />

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <EmptyState title={search ? "No matching jobs" : "No jobs available"} description={search ? "Try using different keywords or remove filters." : "New opportunities will appear here soon."} />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((prev) => prev - 1)}
              onNext={() => setCurrentPage((prev) => prev + 1)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ExploreJobsPage