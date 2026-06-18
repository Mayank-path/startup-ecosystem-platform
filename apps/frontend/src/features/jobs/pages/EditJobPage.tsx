import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

import { getJobById, updateJob } from "../api/job.api"

function EditJobPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [roleType, setRoleType] = useState("INTERNSHIP")
  const [location, setLocation] = useState("")
  const [skillsRequired, setSkillsRequired] = useState("")
  const [salary, setSalary] = useState("")
  const [startupId, setStartupId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return

        const response = await getJobById(id)
        const job = response.data

        setTitle(job.title)
        setDescription(job.description)
        setRoleType(job.roleType)
        setLocation(job.location)
        setSalary(job.salary || "")
        setStartupId(job.startup._id)
        setSkillsRequired(job.skillsRequired.join(", "))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      setIsUpdating(true)

      await updateJob(id, {
        title,
        description,
        roleType,
        location,
        salary,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()).filter(Boolean),
      })

      navigate(`/startups/${startupId}/jobs`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Job Management</p>
        <h1 className="mt-3 text-4xl font-black text-[#F8FAFC]">Edit job posting</h1>
        <p className="mt-3 max-w-2xl text-[#94A3B8]">Update the role details, required skills, salary information, and job visibility for applicants.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Job title</label>
              <Input placeholder="Frontend Intern" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, expectations, and who should apply."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[180px] w-full rounded-xl border border-slate-700 bg-[#1E293B] p-4 text-sm leading-7 text-[#F8FAFC] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Role type</label>
                <select
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-[#1E293B] p-4 text-sm text-[#F8FAFC] outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
                >
                  <option value="INTERNSHIP">Internship</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Location</label>
                <Input placeholder="Remote, Bengaluru, Hybrid..." value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Required skills</label>
              <Input placeholder="React, Node.js, MongoDB" value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} />
              <p className="mt-2 text-sm text-[#94A3B8]">Separate skills using commas.</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Salary / stipend</label>
              <Input placeholder="₹15,000/month, ₹8 LPA, unpaid..." value={salary} onChange={(e) => setSalary(e.target.value)} />
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Saving changes..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        <div className="space-y-5">
          <Card>
            <h2 className="text-xl font-bold text-[#F8FAFC]">Before you save</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#94A3B8]">
              <p>Keep the title specific and searchable.</p>
              <p>Mention whether the job is remote, hybrid, or on-site.</p>
              <p>Add only the most important skills so applicants understand the role quickly.</p>
            </div>
          </Card>

          <Card className="border-[#6366F1]/40 bg-[#6366F1]/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">Tip</p>
            <p className="mt-3 text-sm leading-7 text-[#F8FAFC]">A clear job description usually gets better applicants than a long generic one.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EditJobPage