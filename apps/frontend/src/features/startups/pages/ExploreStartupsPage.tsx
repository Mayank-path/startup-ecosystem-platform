import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getStartups } from "../api/startup.api"
import StartupCard from "../components/StartupCard"

import { useAuthStore } from "../../auth/store/auth.store"

import type { Startup } from "../types/startup.types"

function ExploreStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await getStartups()

        setStartups(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartups()
  }, [])

  if (isLoading) {
    return <div className="p-6">Loading startups...</div>
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-4xl font-bold">
            Explore Startups
          </h1>

          <p className="mt-2 text-gray-600">
            Discover startups, founders, and opportunities
            in the ecosystem.
          </p>
        </div>

        {(user?.role === "ENTREPRENEUR" ||
          user?.role === "ADMIN") && (
          <Link
            to="/startups/create"
            className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Create Startup
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {startups.map((startup) => (
          <StartupCard
            key={startup._id}
            startup={startup}
          />
        ))}
      </div>
    </div>
  )
}

export default ExploreStartupsPage