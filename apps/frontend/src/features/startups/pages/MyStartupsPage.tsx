import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Card from "../../../components/ui/Card"
import StartupCard from "../components/StartupCard"

import {
  getMyStartups,
  deleteStartup,
} from "../api/startup.api"

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

      setStartups((prev) =>
        prev.filter((startup) => startup._id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading your startups...</div>
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            My Startups
          </h1>

          <p className="mt-2 text-gray-600">
            Manage the startups you have created.
          </p>
        </div>

        <Link
          to="/startups/create"
          className="rounded-xl bg-black px-5 py-3 font-medium text-white"
        >
          Create Startup
        </Link>
      </div>

      {startups.length === 0 ? (
        <Card>
          <p className="text-gray-600">
            You have not created any startups yet.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {startups.map((startup) => (
            <div
              key={startup._id}
              className="space-y-3"
            >
              <StartupCard startup={startup} />

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/startups/${startup._id}/edit`}
                  className="rounded-xl border px-4 py-2 text-center text-sm font-medium hover:bg-gray-100"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(startup._id)
                  }
                  className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyStartupsPage