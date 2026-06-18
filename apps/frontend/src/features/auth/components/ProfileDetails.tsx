import Card from "../../../components/ui/Card"
import { useAuthStore } from "../store/auth.store"

function ProfileDetails() {
  const user = useAuthStore((state) => state.user)

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold text-[#F8FAFC]">
        Profile Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-[#94A3B8]">Bio</p>
          <p className="mt-1 text-[#F8FAFC]">{user?.bio || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#94A3B8]">College</p>
          <p className="mt-1 text-[#F8FAFC]">{user?.college || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#94A3B8]">Skills</p>
          <p className="mt-1 text-[#F8FAFC]">
            {user?.skills?.length ? user.skills.join(", ") : "Not added yet"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#94A3B8]">GitHub</p>
          <p className="mt-1 break-all text-[#6366F1]">
            {user?.github || "Not added yet"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#94A3B8]">LinkedIn</p>
          <p className="mt-1 break-all text-[#6366F1]">
            {user?.linkedin || "Not added yet"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#94A3B8]">Verified</p>
          <p className={`mt-1 font-medium ${user?.isVerified ? "text-green-400" : "text-yellow-400"}`}>
            {user?.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ProfileDetails