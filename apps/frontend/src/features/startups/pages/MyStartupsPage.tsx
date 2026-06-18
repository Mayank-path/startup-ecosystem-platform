import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import EmptyState from "../../../components/ui/EmptyState"
import StartupCard from "../components/StartupCard"

import { getMyStartups, deleteStartup } from "../api/startup.api"

import type { Startup } from "../types/startup.types"

function MyStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyStartups = async () => {
      try {
        const response = await getMyStartups()
        setStartups(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyStartups()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this startup?"
    )

    if (!confirmDelete) return

    try {
      await deleteStartup(id)
      setStartups((prev) => prev.filter((startup) => startup._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-[calc(100vh-160px)] max-w-7xl space-y-8 px-6 py-16">
      <div className="flex flex-col gap-5 border-b border-slate-700 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
            Founder Workspace
          </p>

          <h1 className="mt-3 text-5xl font-black text-[#F8FAFC]">
            My Startups
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#94A3B8]">
            Manage your startup profiles, job postings, and applicant pipeline
            from one place.
          </p>
        </div>

        <Link to="/startups/create">
          <Button>Create Startup</Button>
        </Link>
      </div>

      {startups.length === 0 ? (
        <EmptyState
          title="No startups created yet"
          description="Create your first startup profile to start posting jobs and receiving applications."
          action={
            <Link to="/startups/create">
              <Button>Create Startup</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {startups.map((startup) => (
            <div key={startup._id} className="space-y-4">
              <StartupCard startup={startup} />

              <div className="rounded-2xl border border-slate-700 bg-[#1E293B] p-4">
                <div className="grid grid-cols-3 gap-3">
                  <Link to={`/startups/${startup._id}/edit`}>
                    <Button variant="secondary" className="w-full">
                      Edit
                    </Button>
                  </Link>

                  <Link to={`/startups/${startup._id}/jobs`}>
                    <Button className="w-full">Jobs</Button>
                  </Link>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDelete(startup._id)}
                    className="w-full"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyStartupsPage