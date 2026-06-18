import { useState } from "react"

import { updateProfile } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

function ProfileForm() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

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
      setErrorMessage(error.response?.data?.message || "Could not update profile.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-700 bg-[#1E293B]/70 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#F8FAFC]">
          Edit Profile
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
          Update the information people see when they visit your profile.
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
            placeholder="Full-stack developer interested in startups and product building"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
            College
          </label>

          <Input
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Lovely Professional University"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
            Skills
          </label>

          <Input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />

          <p className="mt-2 text-xs text-[#94A3B8]">
            Use commas between skills, for example: React, Node.js, MongoDB.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#F8FAFC]">
              GitHub
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