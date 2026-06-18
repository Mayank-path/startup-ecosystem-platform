import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

import { createJob } from "../api/job.api"

function CreateJobPage() {
  const { startupId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [roleType, setRoleType] = useState("INTERNSHIP")
  const [location, setLocation] = useState("Remote")
  const [skillsRequired, setSkillsRequired] = useState("")
  const [salary, setSalary] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startupId) return

    try {
      setIsSubmitting(true)

      await createJob({
        startup: startupId,
        title,
        description,
        roleType: roleType as "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT",
        location,
        salary,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()).filter(Boolean),
      })

      navigate(`/startups/${startupId}/jobs`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Card>
        <h1 className="mb-6 text-3xl font-black text-[#F8FAFC]">Create Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[160px] w-full rounded-xl border border-slate-700 bg-[#1E293B] p-4 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
          />

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

          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input placeholder="React, Node.js, MongoDB" value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} />
          <Input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create Job"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default CreateJobPage