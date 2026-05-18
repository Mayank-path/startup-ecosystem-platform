import Card from "../../../components/ui/Card"
import { useAuthStore } from "../store/auth.store"

function ProfileDetails() {
  const user = useAuthStore((state) => state.user)

  return (
    <Card>
      <h2 className="mb-4 text-2xl font-bold">
        Profile Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Bio</p>
          <p>{user?.bio || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">College</p>
          <p>{user?.college || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Skills</p>
          <p>
            {user?.skills?.length
              ? user.skills.join(", ")
              : "Not added yet"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">GitHub</p>
          <p>{user?.github || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">LinkedIn</p>
          <p>{user?.linkedin || "Not added yet"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Verified</p>
          <p>{user?.isVerified ? "Yes" : "No"}</p>
        </div>
      </div>
    </Card>
  )
}

export default ProfileDetails