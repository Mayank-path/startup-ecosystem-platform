import { useState } from "react"

import { updateProfile } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

const roleContent = {
  STUDENT: {
    title: "Edit Student Profile",
    description:
      "Add your college, skills, and links so startups can understand your background.",
    bioPlaceholder:
      "Computer science student interested in full-stack development and startup internships",
    skillsPlaceholder: "React, Node.js, MongoDB, DSA",
  },

  ENTREPRENEUR: {
    title: "Edit Founder Profile",
    description:
      "Tell people what you build and what kind of talent you are looking for.",
    bioPlaceholder:
      "Founder building an edtech startup and hiring students for frontend/backend roles",
    skillsPlaceholder: "Product, Hiring, React, Marketing",
  },

  INVESTOR: {
    title: "Edit Investor Profile",
    description:
      "Share your investment interests so startups understand your focus.",
    bioPlaceholder:
      "Interested in early-stage SaaS, edtech, and AI startups",
    skillsPlaceholder: "SaaS, EdTech, AI, Angel Investing",
  },

  FREELANCER: {
    title: "Edit Freelancer Profile",
    description:
      "Show your services, skills, and work links for startup collaborations.",
    bioPlaceholder:
      "Freelance frontend developer helping startups build landing pages and dashboards",
    skillsPlaceholder: "React, Tailwind, UI Design, API Integration",
  },

  ADMIN: {
    title: "Edit Admin Profile",
    description: "Manage your platform profile.",
    bioPlaceholder: "Platform administrator",
    skillsPlaceholder: "Management, Review, Operations",
  },
}

function ProfileForm() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const content =
    roleContent[user?.role as keyof typeof roleContent] || roleContent.STUDENT

  const [bio, setBio] = useState(user?.bio || "")
  const [college, setCollege] = useState(user?.college || "")
  const [github, setGithub] = useState(user?.github || "")
  const [linkedin, setLinkedin] = useState(user?.linkedin || "")
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "")

  const [isUpdating, setIsUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsUpdating(true)
      setSuccessMessage("")
      setErrorMessage("")

      const response = await updateProfile({
        bio,
        college,
        github,
        linkedin,
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      })

      setUser(response.data)
      setSuccessMessage("Saved your profile changes.")
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Could not update profile."
      )
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-700 bg-[#1E293B]/70 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#F8FAFC]">
          {content.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
          {content.description}
        </p>

        {successMessage && (
          <p className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
            {errorMessage}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
            Bio
          </label>

          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={content.bioPlaceholder}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
            College / Organization
          </label>

          <Input
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Lovely Professional University"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
            Skills / Interests
          </label>

          <Input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder={content.skillsPlaceholder}
          />

          <p className="mt-2 text-xs text-[#94A3B8]">
            Use commas between items, for example: React, Node.js, MongoDB.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
              GitHub / Portfolio
            </label>

            <Input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
              LinkedIn
            </label>

            <Input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full rounded-xl py-3 font-semibold"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ProfileForm