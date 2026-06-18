import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import LoadingSpinner from "../../../components/ui/LoadingSpinner"

import StartupLogoUpload from "../components/StartupLogoUpload"

import { getStartupById, updateStartup } from "../api/startup.api"

function EditStartupPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [fundingStage, setFundingStage] = useState("IDEA")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [techStack, setTechStack] = useState("")
  const [logo, setLogo] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        if (!id) return

        const response = await getStartupById(id)
        const startup = response.data

        setName(startup.name)
        setTagline(startup.tagline)
        setDescription(startup.description)
        setIndustry(startup.industry)
        setFundingStage(startup.fundingStage)
        setLocation(startup.location)
        setWebsite(startup.website)
        setTechStack(startup.techStack?.join(", ") || "")
        setLogo(startup.logo || "")
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartup()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      setIsUpdating(true)

      await updateStartup(id, {
        name,
        tagline,
        description,
        industry,
        fundingStage,
        location,
        website,
        techStack: techStack.split(",").map((tech) => tech.trim()).filter(Boolean),
      })

      navigate("/my-startups")
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
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Startup Workspace</p>
        <h1 className="mt-3 text-4xl font-black text-[#F8FAFC]">Update startup profile</h1>
        <p className="mt-3 max-w-2xl text-[#94A3B8]">Keep your startup profile accurate so students, freelancers, and investors understand what you are building.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
        <Card>
          {id && (
            <div className="mb-8 border-b border-slate-700 pb-8">
              <StartupLogoUpload startupId={id} currentLogo={logo} onLogoUpdated={(logoUrl) => setLogo(logoUrl)} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Startup name</label>
              <Input placeholder="StartupHub" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Tagline</label>
              <Input placeholder="One line that explains what your startup does" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Description</label>
              <textarea
                placeholder="Describe the problem, your solution, target users, and what makes the startup useful."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[170px] w-full rounded-xl border border-slate-700 bg-[#1E293B] p-4 text-sm leading-7 text-[#F8FAFC] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Industry</label>
                <Input placeholder="FinTech, EdTech, HealthTech..." value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Funding stage</label>
                <select value={fundingStage} onChange={(e) => setFundingStage(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-[#1E293B] p-4 text-sm text-[#F8FAFC] outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30">
                  <option value="IDEA">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="SEED">Seed</option>
                  <option value="SERIES_A">Series A</option>
                  <option value="GROWTH">Growth</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Location</label>
                <Input placeholder="Bengaluru, Remote, Delhi..." value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Website</label>
                <Input placeholder="https://startup.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#F8FAFC]">Tech stack</label>
              <Input placeholder="React, Node.js, MongoDB" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
              <p className="mt-2 text-sm text-[#94A3B8]">Separate technologies using commas.</p>
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? "Saving changes..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        <div className="space-y-5">
          <Card>
            <h2 className="text-xl font-bold text-[#F8FAFC]">Profile quality</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#94A3B8]">
              <p>Keep your tagline short and specific.</p>
              <p>Explain what problem your startup solves.</p>
              <p>Add technologies that are actually used in the product.</p>
            </div>
          </Card>

          <Card className="border-[#6366F1]/40 bg-[#6366F1]/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">Next step</p>
            <p className="mt-3 text-sm leading-7 text-[#F8FAFC]">After updating the profile, review your posted jobs and applicant pipeline.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EditStartupPage