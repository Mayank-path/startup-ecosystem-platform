import Card from "../../../components/ui/Card"
import { Link } from "react-router-dom"

import type { Startup } from "../types/startup.types"

interface Props {
  startup: Startup
}

function StartupCard({ startup }: Props) {
  return (
    <Link to={`/startups/${startup._id}`}>
        <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
        <div className="mb-4 flex items-center gap-3">
        {startup.logo ? (
          <img
            src={startup.logo}
            alt={startup.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 font-bold">
            {startup.name.charAt(0)}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold">
            {startup.name}
          </h2>

          <p className="text-sm text-gray-500">
            {startup.industry}
          </p>
        </div>
      </div>

      <p className="font-medium">
        {startup.tagline}
      </p>

      <p className="mt-2 line-clamp-3 text-sm text-gray-600">
        {startup.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {startup.techStack?.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{startup.fundingStage}</span>
        <span>{startup.location}</span>
      </div>
        </Card>
    </Link>
  )
}

export default StartupCard