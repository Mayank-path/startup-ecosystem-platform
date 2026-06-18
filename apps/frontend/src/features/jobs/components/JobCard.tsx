import { Link } from "react-router-dom"

import Card from "../../../components/ui/Card"

import type { Job } from "../types/job.types"

interface Props {
  job: Job
}

function JobCard({ job }: Props) {
  return (
    <Link to={`/jobs/${job._id}`}>
      <Card className="h-full transition hover:-translate-y-1 hover:border-[#6366F1]">
        <div className="flex items-start gap-4">
          {job.startup.logo ? (
            <img
              src={job.startup.logo}
              alt={job.startup.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A] text-lg font-bold text-[#F8FAFC]">
              {job.startup.name.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold text-[#F8FAFC]">
              {job.title}
            </h2>

            <p className="mt-1 text-sm text-[#94A3B8]">
              {job.startup.name}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#94A3B8]">
          {job.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {job.skillsRequired.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-700 bg-[#0F172A] px-3 py-1 text-xs font-medium text-[#94A3B8]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-medium text-[#6366F1]">
            {job.roleType.replace("_", " ")}
          </span>

          <span className="text-[#94A3B8]">
            {job.location}
          </span>
        </div>

        {job.salary && (
          <p className="mt-3 text-sm font-semibold text-[#F59E0B]">
            {job.salary}
          </p>
        )}
      </Card>
    </Link>
  )
}

export default JobCard