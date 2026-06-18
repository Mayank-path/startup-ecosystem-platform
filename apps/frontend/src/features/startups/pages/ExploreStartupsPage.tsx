import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getStartups } from "../api/startup.api"
import StartupCard from "../components/StartupCard"

import { useAuthStore } from "../../auth/store/auth.store"

import type { Startup } from "../types/startup.types"

import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import Pagination from "../../../components/ui/Pagination"

import useDebounce from "../../../hooks/useDebounce"

function ExploreStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const user = useAuthStore((state) => state.user)
  const debouncedSearch = useDebounce(search)
  const startupsPerPage = 6

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await getStartups(currentPage, startupsPerPage, debouncedSearch)

        setStartups(response.data.startups)
        setTotalPages(response.data.totalPages || 1)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
        setIsInitialLoading(false)
      }
    }

    fetchStartups()
  }, [currentPage, debouncedSearch])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  if (isInitialLoading) return <LoadingSpinner />

  if (hasError) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ErrorState title="Unable to load startups" description="Please try again later." />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <div className="flex flex-col gap-5 border-b border-slate-700 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Startup Directory</p>
          <h1 className="mt-3 text-5xl font-black text-[#F8FAFC]">Discover Startups</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#94A3B8]">Explore founder-led startups, their industries, tech stacks, funding stages, and opportunities.</p>
        </div>

        {(user?.role === "ENTREPRENEUR" || user?.role === "ADMIN") && (
          <Link to="/startups/create">
            <Button>Create Startup</Button>
          </Link>
        )}
      </div>

      <div className="rounded-3xl border border-slate-700 bg-[#1E293B] p-5">
        <Input placeholder="Search by startup name, industry, location, or tagline..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : startups.length === 0 ? (
        <EmptyState title={search ? "No matching startups" : "No startups found"} description={search ? "Try using a different startup name, industry, or location." : "Startups will appear here once founders create them."} />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {startups.map((startup) => <StartupCard key={startup._id} startup={startup} />)}
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

export default ExploreStartupsPage