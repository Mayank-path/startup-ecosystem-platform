import { Briefcase, ExternalLink, Globe, ShieldCheck } from "lucide-react"
import { useAuthStore } from "../store/auth.store"

function ProfileDetails() {
  const user = useAuthStore((state) => state.user)

  return (
    <section className="rounded-[2rem] border border-slate-700 bg-[#1E293B]/70 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#F8FAFC]">About</h2>
        <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
          A quick overview of your profile information.
        </p>
      </div>

      <div className="space-y-7">
        <div>
          <p className="text-sm font-semibold text-[#94A3B8]">Bio</p>
          <p className="mt-2 leading-7 text-[#F8FAFC]">
            {user?.bio || "No bio added yet."}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#94A3B8]">College</p>
          <p className="mt-2 text-[#F8FAFC]">
            {user?.college || "College not added yet."}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#94A3B8]">Skills</p>

          {user?.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-700 bg-[#0F172A] px-3 py-1 text-sm text-[#CBD5E1]"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-[#F8FAFC]">No skills added yet.</p>
          )}
        </div>

        <div className="border-t border-slate-700 pt-6">
          <h3 className="mb-4 text-lg font-bold text-[#F8FAFC]">Links</h3>

          <div className="space-y-3">
            {user?.github ? (
              <a
                href={user.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-[#CBD5E1] transition hover:border-[#6366F1] hover:text-[#F8FAFC]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Globe size={18} className="shrink-0 text-[#A5B4FC]" />
                  <span className="truncate">{user.github}</span>
                </span>

                <ExternalLink size={16} className="shrink-0 text-[#94A3B8]" />
              </a>
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-700 px-4 py-3 text-[#94A3B8]">
                GitHub not added yet.
              </p>
            )}

            {user?.linkedin ? (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-[#0F172A] px-4 py-3 text-[#CBD5E1] transition hover:border-[#6366F1] hover:text-[#F8FAFC]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Briefcase size={18} className="shrink-0 text-[#A5B4FC]" />
                  <span className="truncate">{user.linkedin}</span>
                </span>

                <ExternalLink size={16} className="shrink-0 text-[#94A3B8]" />
              </a>
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-700 px-4 py-3 text-[#94A3B8]">
                LinkedIn not added yet.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#0F172A] p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#6366F1]" />

            <div>
              <p className="font-semibold text-[#F8FAFC]">
                Account verification
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Verification helps build trust on the platform.
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
              user?.isVerified
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {user?.isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>
    </section>
  )
}

export default ProfileDetails