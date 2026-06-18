import { Link } from "react-router-dom"

import Card from "../../../components/ui/Card"

import type { Startup } from "../types/startup.types"

interface Props {
  startup: Startup
}

function StartupCard({ startup }: Props) {
  return (
    <Link to={`/startups/${startup._id}`}>
      <Card className="h-full transition hover:-translate-y-1 hover:border-[#6366F1]">
        <div className="mb-5 flex items-center gap-4">
          {startup.logo ? (
            <img
              src={startup.logo}
              alt={startup.name}
              className="h-14 w-14 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A] text-lg font-bold text-[#F8FAFC]">
              {startup.name.charAt(0)}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-[#F8FAFC]">
              {startup.name}
            </h2>

            <p className="text-sm text-[#94A3B8]">
              {startup.industry}
            </p>
          </div>
        </div>

        <p className="font-medium text-[#F59E0B]">
          {startup.tagline}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#94A3B8]">
          {startup.description}
        </p>

        {startup.techStack?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {startup.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 bg-[#0F172A] px-3 py-1 text-xs text-[#94A3B8]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4 text-sm">
          <span className="font-medium text-[#6366F1]">
            {startup.fundingStage}
          </span>

          <span className="text-[#94A3B8]">
            {startup.location}
          </span>
        </div>
      </Card>
    </Link>
  )
}

export default StartupCard