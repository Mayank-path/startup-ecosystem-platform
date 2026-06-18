import AvatarUpload from "../components/AvatarUpload"
import ProfileDetails from "../components/ProfileDetails"
import ProfileForm from "../components/ProfileForm"
import { useAuthStore } from "../store/auth.store"

import Card from "../../../components/ui/Card"

function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="h-24 w-24 rounded-full border-2 border-slate-700 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F172A] text-3xl font-bold text-[#F8FAFC]">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold text-[#F8FAFC]">
                  {user?.name}
                </h1>

                <p className="mt-1 text-[#94A3B8]">
                  {user?.email}
                </p>

                <span className="mt-3 inline-block rounded-full bg-[#6366F1] px-3 py-1 text-sm font-medium text-white">
                  {user?.role}
                </span>
              </div>
            </div>

            <AvatarUpload />
          </div>
        </Card>

        <ProfileDetails />

        <ProfileForm />
      </div>
    </div>
  )
}

export default ProfilePage