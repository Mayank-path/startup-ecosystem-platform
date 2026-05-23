import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getStartups } from "../api/startup.api"
import StartupCard from "../components/StartupCard"

import { useAuthStore } from "../../auth/store/auth.store"

import type { Startup } from "../types/startup.types"

import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"

function ExploreStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [search, setSearch] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await getStartups()

        setStartups(response.data)
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartups()
  }, [])

  const filteredStartups = startups.filter((startup) => {
    const searchText = search.toLowerCase()

    return (
      startup.name.toLowerCase().includes(searchText) ||
      startup.industry.toLowerCase().includes(searchText) ||
      startup.location.toLowerCase().includes(searchText) ||
      startup.tagline.toLowerCase().includes(searchText)
    )
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (hasError) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <ErrorState
          title="Unable to load startups"
          description="Please try again later."
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <PageHeader
        title="Explore Startups"
        subtitle="Discover startups, founders, and opportunities in the ecosystem."
        action={
          (user?.role === "ENTREPRENEUR" ||
            user?.role === "ADMIN") && (
            <Link to="/startups/create">
              <Button>
                Create Startup
              </Button>
            </Link>
          )
        }
      />

      <Input
        placeholder="Search startups by name, industry, location, or tagline..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {startups.length === 0 ? (
        <EmptyState
          title="No startups found"
          description="Startups will appear here once founders create them."
        />
      ) : filteredStartups.length === 0 ? (
        <EmptyState
          title="No matching startups"
          description="Try searching with a different name, industry, or location."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStartups.map((startup) => (
            <StartupCard
              key={startup._id}
              startup={startup}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExploreStartupsPage