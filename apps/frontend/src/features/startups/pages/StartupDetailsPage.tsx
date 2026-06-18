import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"

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

  if (isLoading) return <LoadingSpinner />

  if (!startup) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8">
        <ErrorState title="Startup not found" description="This startup profile may have been removed." />
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-[#1E293B] px-8 py-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#6366F1]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[#F59E0B]/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            {startup.logo ? (
              <img src={startup.logo} alt={startup.name} className="h-24 w-24 rounded-3xl border border-slate-700 object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0F172A] text-3xl font-bold text-[#F8FAFC]">
                {startup.name.charAt(0)}
              </div>
            )}

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Startup Profile</p>
              <h1 className="mt-2 text-5xl font-black text-[#F8FAFC]">{startup.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-[#94A3B8]">{startup.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#6366F1]/30 bg-[#6366F1]/15 px-4 py-2 text-sm font-medium text-[#F8FAFC]">{startup.industry}</span>
                <span className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/15 px-4 py-2 text-sm font-medium text-[#F59E0B]">{startup.fundingStage}</span>
                <span className="rounded-full border border-slate-700 bg-[#0F172A] px-4 py-2 text-sm text-[#94A3B8]">{startup.location}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {startup.website && (
              <a href={startup.website} target="_blank" rel="noreferrer">
                <Button variant="secondary">Visit Website</Button>
              </a>
            )}

            <Button>Connect</Button>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">About</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">What they are building</h2>
            <p className="mt-5 text-lg leading-9 text-[#94A3B8]">{startup.description}</p>
          </section>

          <section className="border-t border-slate-700 pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">Technology</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">Tech Stack</h2>

            {startup.techStack?.length ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {startup.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-slate-700 bg-[#1E293B] px-4 py-2 text-sm text-[#94A3B8]">
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[#94A3B8]">No technologies added yet.</p>
            )}
          </section>

          <section className="border-t border-slate-700 pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">Founder</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">Founder details</h2>

            <div className="mt-5 flex items-center gap-4">
              {startup.founder.avatar ? (
                <img src={startup.founder.avatar} alt={startup.founder.name} className="h-16 w-16 rounded-full border border-slate-700 object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E293B] text-xl font-bold text-[#F8FAFC]">
                  {startup.founder.name.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-[#F8FAFC]">{startup.founder.name}</h3>
                <p className="text-[#94A3B8]">{startup.founder.email}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[2rem] border border-slate-700 bg-[#1E293B] p-6">
          <h2 className="text-xl font-bold text-[#F8FAFC]">Startup Snapshot</h2>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-3">
              <span className="text-[#94A3B8]">Industry</span>
              <span className="font-medium text-[#F8FAFC]">{startup.industry}</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-3">
              <span className="text-[#94A3B8]">Funding</span>
              <span className="font-medium text-[#F8FAFC]">{startup.fundingStage}</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-3">
              <span className="text-[#94A3B8]">Location</span>
              <span className="font-medium text-[#F8FAFC]">{startup.location}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#94A3B8]">Verified</span>
              <span className={startup.isVerified ? "font-medium text-green-400" : "font-medium text-[#F59E0B]"}>
                {startup.isVerified ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default StartupDetailsPage