import { Link } from "react-router-dom"

import Card from "../../../components/ui/Card"

import type { Job } from "../types/job.types"

interface Props {
  job: Job
}

function JobCard({ job }: Props) {
  return (
    <Link to={`/jobs/${job._id}`}>
      <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start gap-4">
          {job.startup.logo ? (
            <img
              src={job.startup.logo}
              alt={job.startup.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-200 text-xl font-bold">
              {job.startup.name.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold">
              {job.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {job.startup.name}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm text-gray-600">
          {job.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {job.skillsRequired.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            {job.roleType.replace("_", " ")}
          </span>

          <span className="text-gray-500">
            {job.location}
          </span>
        </div>

        {job.salary && (
          <p className="mt-3 text-sm font-semibold text-green-600">
            {job.salary}
          </p>
        )}
      </Card>
    </Link>
  )
}

export default JobCard