import { useState } from "react"

import { updateProfile } from "../api/auth.api"
import { useAuthStore } from "../store/auth.store"

import Card from "../../../components/ui/Card"
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
        skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      })

      setUser(response.data)
      setSuccessMessage("Profile updated successfully")
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-[#F8FAFC]">Edit Profile</h2>

        <div>
          {successMessage && <p className="text-sm font-medium text-green-400">{successMessage}</p>}
          {errorMessage && <p className="text-sm font-medium text-red-400">{errorMessage}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-[#F8FAFC]">Bio</label>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#F8FAFC]">College</label>
          <Input value={college} onChange={(e) => setCollege(e.target.value)} placeholder="College name" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#F8FAFC]">Skills</label>
          <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js, MongoDB" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#F8FAFC]">GitHub</label>
          <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#F8FAFC]">LinkedIn</label>
          <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" />
        </div>

        <div className="md:col-span-2">
          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ProfileForm