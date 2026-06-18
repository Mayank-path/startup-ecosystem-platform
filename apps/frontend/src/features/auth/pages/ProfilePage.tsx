import AvatarUpload from "../components/AvatarUpload"
import ProfileDetails from "../components/ProfileDetails"
import ProfileForm from "../components/ProfileForm"
import { useAuthStore } from "../store/auth.store"

function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <main className="min-h-[calc(100vh-64px)] px-6 py-10 text-[#F8FAFC]">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-700 bg-[#1E293B]/80 p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || "Profile avatar"}
                  className="h-24 w-24 rounded-full border-2 border-slate-700 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0F172A] text-4xl font-black text-[#F8FAFC]">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div>
                <h1 className="text-4xl font-black">
                  {user?.name || "User"}
                </h1>

                <p className="mt-2 text-[#94A3B8]">
                  {user?.email}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#6366F1]/20 px-4 py-1.5 text-sm font-semibold text-[#A5B4FC]">
                    {user?.role || "USER"}
                  </span>

                  {user?.college && (
                    <span className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-[#CBD5E1]">
                      {user.college}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <AvatarUpload />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ProfileDetails />
          <ProfileForm />
        </section>
      </div>
    </main>
  )
}

export default ProfilePage