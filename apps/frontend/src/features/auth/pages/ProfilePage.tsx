import AvatarUpload from "../components/AvatarUpload"
import ProfileDetails from "../components/ProfileDetails"
import ProfileForm from "../components/ProfileForm"
import { useAuthStore } from "../store/auth.store"

import Card from "../../../components/ui/Card"

function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <Card>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name}
                </h1>

                <p className="text-gray-600">
                  {user?.email}
                </p>

                <span className="mt-2 inline-block rounded-full bg-black px-3 py-1 text-sm text-white">
                  {user?.role}
                </span>
              </div>
            </div>

            <AvatarUpload />
          </div>
        </Card>

        <div className="mt-6">
          <ProfileDetails />
        </div>

        <div className="mt-6">
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage