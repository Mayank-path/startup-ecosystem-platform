import { useState } from "react"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

import { createStartup } from "../api/startup.api"

function CreateStartupPage() {
  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [fundingStage, setFundingStage] = useState("IDEA")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [techStack, setTechStack] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      await createStartup({
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

      alert("Startup created successfully")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card>
        <h1 className="mb-6 text-3xl font-bold">
          Create Startup
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            placeholder="Startup Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            placeholder="Tagline"
            value={tagline}
            onChange={(e) =>
              setTagline(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="min-h-[140px] w-full rounded-xl border p-4 outline-none"
          />

          <Input
            placeholder="Industry"
            value={industry}
            onChange={(e) =>
              setIndustry(e.target.value)
            }
          />

          <select
            value={fundingStage}
            onChange={(e) =>
              setFundingStage(e.target.value)
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="IDEA">Idea</option>
            <option value="MVP">MVP</option>
            <option value="SEED">Seed</option>
            <option value="SERIES_A">
              Series A
            </option>
            <option value="GROWTH">
              Growth
            </option>
          </select>

          <Input
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <Input
            placeholder="Website"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
          />

          <Input
            placeholder="React, Node.js, MongoDB"
            value={techStack}
            onChange={(e) =>
              setTechStack(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading
              ? "Creating..."
              : "Create Startup"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default CreateStartupPage