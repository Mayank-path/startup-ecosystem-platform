import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import { getStartupById } from "../api/startup.api"
import type { Startup } from "../types/startup.types"

function StartupDetailsPage() {
  const { id } = useParams()

  const [startup, setStartup] = useState<Startup | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        if (!id) return

        const response = await getStartupById(id)

        setStartup(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartup()
  }, [id])

  if (isLoading) return <div className="p-6">Loading startup...</div>

  if (!startup) return <div className="p-6">Startup not found</div>

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Card>
        <div className="flex items-center gap-4">
          {startup.logo ? (
            <img
              src={startup.logo}
              alt={startup.name}
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 text-2xl font-bold">
              {startup.name.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold">{startup.name}</h1>
            <p className="mt-1 text-gray-600">{startup.tagline}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-2xl font-bold">About</h2>
        <p className="text-gray-700">{startup.description}</p>
      </Card>

      <Card>
        <h2 className="mb-4 text-2xl font-bold">Startup Info</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <p>
            <span className="font-semibold">Industry:</span> {startup.industry}
          </p>

          <p>
            <span className="font-semibold">Funding:</span>{" "}
            {startup.fundingStage}
          </p>

          <p>
            <span className="font-semibold">Location:</span> {startup.location}
          </p>

          <p>
            <span className="font-semibold">Verified:</span>{" "}
            {startup.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </Card>

      <Card>
  <h2 className="mb-4 text-2xl font-bold">
    Tech Stack
  </h2>

  <div className="flex flex-wrap gap-3">
    {startup.techStack?.map((tech) => (
      <span
        key={tech}
        className="rounded-full bg-gray-100 px-4 py-2 text-sm"
      >
        {tech}
      </span>
    ))}
  </div>
</Card>

<Card>
  <h2 className="mb-4 text-2xl font-bold">
    Founder
  </h2>

  <div className="flex items-center gap-4">
    {startup.founder.avatar ? (
      <img
        src={startup.founder.avatar}
        alt={startup.founder.name}
        className="h-16 w-16 rounded-full object-cover"
      />
    ) : (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-bold">
        {startup.founder.name.charAt(0)}
      </div>
    )}

    <div>
      <h3 className="text-xl font-semibold">
        {startup.founder.name}
      </h3>

      <p className="text-gray-600">
        {startup.founder.email}
      </p>
    </div>
  </div>
</Card>

<Card>
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        Interested in this startup?
      </h2>

      <p className="mt-1 text-gray-600">
        Connect with founders, explore opportunities,
        and collaborate.
      </p>
    </div>

    <div className="flex gap-3">
      {startup.website && (
        <a
          href={startup.website}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border px-5 py-3 font-medium transition hover:bg-gray-100"
        >
          Visit Website
        </a>
      )}

      <button className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800">
        Connect
      </button>
    </div>
  </div>
</Card>
    </div>
  )
}

export default StartupDetailsPage