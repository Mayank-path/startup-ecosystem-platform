import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

import StartupLogoUpload from "../components/StartupLogoUpload"

import {
  getStartupById,
  updateStartup,
} from "../api/startup.api"

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
        techStack: techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      })

      navigate("/my-startups")
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading startup...</div>
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card>
        <h1 className="mb-6 text-3xl font-bold">
          Edit Startup
        </h1>

        {id && (
          <div className="mb-6">
            <StartupLogoUpload
              startupId={id}
              currentLogo={logo}
              onLogoUpdated={(logoUrl) => setLogo(logoUrl)}
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            placeholder="Startup Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[140px] w-full rounded-xl border p-4 outline-none"
          />

          <Input
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />

          <select
            value={fundingStage}
            onChange={(e) => setFundingStage(e.target.value)}
            className="w-full rounded-xl border p-4"
          >
            <option value="IDEA">Idea</option>
            <option value="MVP">MVP</option>
            <option value="SEED">Seed</option>
            <option value="SERIES_A">Series A</option>
            <option value="GROWTH">Growth</option>
          </select>

          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Input
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <Input
            placeholder="React, Node.js, MongoDB"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default EditStartupPage