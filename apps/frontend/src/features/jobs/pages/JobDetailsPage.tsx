import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import ErrorState from "../../../components/ui/ErrorState"

import { getJobById } from "../api/job.api"

import type { Job } from "../types/job.types"

import ApplyJobForm from "../../applications/components/ApplyJobForm"
import { useAuthStore } from "../../auth/store/auth.store"

function JobDetailsPage() {
  const { id } = useParams()
  const user = useAuthStore((state) => state.user)

  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return
        const response = await getJobById(id)
        setJob(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [id])

  if (isLoading) return <LoadingSpinner />

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-8">
        <ErrorState title="Job not found" description="This opportunity may have been removed by the startup." />
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-[#1E293B] px-8 py-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#6366F1]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[#F59E0B]/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            {job.startup.logo ? (
              <img src={job.startup.logo} alt={job.startup.name} className="h-20 w-20 rounded-2xl border border-slate-700 object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0F172A] text-2xl font-bold text-[#F8FAFC]">
                {job.startup.name.charAt(0)}
              </div>
            )}

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Opportunity</p>
              <h1 className="mt-2 max-w-3xl text-5xl font-black leading-tight text-[#F8FAFC]">{job.title}</h1>
              <p className="mt-3 text-lg text-[#94A3B8]">{job.startup.name}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#6366F1]/30 bg-[#6366F1]/15 px-4 py-2 text-sm font-medium text-[#F8FAFC]">{job.roleType.replace("_", " ")}</span>
                <span className="rounded-full border border-slate-700 bg-[#0F172A] px-4 py-2 text-sm text-[#94A3B8]">{job.location}</span>
                {job.salary && <span className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/15 px-4 py-2 text-sm font-medium text-[#F59E0B]">{job.salary}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-10">
          <section>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">Role Details</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">About the role</h2>
            <p className="mt-5 text-lg leading-9 text-[#94A3B8]">{job.description}</p>
          </section>

          <section className="border-t border-slate-700 pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">Requirements</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">Skills required</h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {job.skillsRequired.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-700 bg-[#1E293B] px-4 py-2 text-sm text-[#94A3B8]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-700 pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">Startup</p>
            <h2 className="mt-3 text-3xl font-black text-[#F8FAFC]">Posted by {job.startup.name}</h2>
            <p className="mt-5 text-lg leading-9 text-[#94A3B8]">This opportunity is posted by a startup in the ecosystem. Review the role details and apply only if your profile matches the expectations.</p>
          </section>
        </div>

        <aside className="h-fit rounded-[2rem] border border-slate-700 bg-[#1E293B] p-6">
          <h2 className="text-2xl font-bold text-[#F8FAFC]">Apply for this role</h2>
          <p className="mt-2 text-sm leading-7 text-[#94A3B8]">Submit your cover letter and resume so the startup can review your profile.</p>

          <div className="mt-6">
            {user?.role === "STUDENT" ? (
              <ApplyJobForm jobId={job._id} />
            ) : user ? (
              <div className="rounded-xl border border-slate-700 bg-[#0F172A] px-5 py-4 text-sm text-[#94A3B8]">Only students can apply for jobs.</div>
            ) : (
              <div className="rounded-xl border border-slate-700 bg-[#0F172A] px-5 py-4 text-sm text-[#94A3B8]">Please login as a student to apply.</div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-700 pt-5">
            <p className="text-sm font-semibold text-[#F8FAFC]">Quick summary</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[#94A3B8]">Type</span>
                <span className="text-[#F8FAFC]">{job.roleType.replace("_", " ")}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[#94A3B8]">Location</span>
                <span className="text-[#F8FAFC]">{job.location}</span>
              </div>

              {job.salary && (
                <div className="flex justify-between gap-4">
                  <span className="text-[#94A3B8]">Salary</span>
                  <span className="text-[#F59E0B]">{job.salary}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default JobDetailsPage