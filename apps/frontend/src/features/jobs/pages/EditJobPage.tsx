import { useEffect, useState } from "react"
import {
  useNavigate,
  useParams,
} from "react-router-dom"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

import {
  getJobById,
  updateJob,
} from "../api/job.api"

function EditJobPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [title, setTitle] =
    useState("")
  const [description, setDescription] =
    useState("")
  const [roleType, setRoleType] =
    useState("INTERNSHIP")
  const [location, setLocation] =
    useState("")
  const [skillsRequired, setSkillsRequired] =
    useState("")
  const [salary, setSalary] =
    useState("")

  const [startupId, setStartupId] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(true)

  const [isUpdating, setIsUpdating] =
    useState(false)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return

        const response =
          await getJobById(id)

        const job = response.data

        setTitle(job.title)
        setDescription(
          job.description
        )
        setRoleType(job.roleType)
        setLocation(job.location)
        setSalary(job.salary || "")
        setStartupId(job.startup._id)

        setSkillsRequired(
          job.skillsRequired.join(", ")
        )
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [id])

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
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
        skillsRequired:
          skillsRequired
            .split(",")
            .map((skill) =>
              skill.trim()
            )
            .filter(Boolean),
      })

      navigate(
        `/startups/${startupId}/jobs`
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        Loading job...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card>
        <h1 className="mb-6 text-3xl font-bold">
          Edit Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="min-h-[160px] w-full rounded-xl border p-4 outline-none"
          />

          <select
            value={roleType}
            onChange={(e) =>
              setRoleType(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-4"
          >
            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="FULL_TIME">
              Full Time
            </option>

            <option value="PART_TIME">
              Part Time
            </option>

            <option value="CONTRACT">
              Contract
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
            placeholder="React, Node.js"
            value={skillsRequired}
            onChange={(e) =>
              setSkillsRequired(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Salary"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating
              ? "Updating..."
              : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default EditJobPage