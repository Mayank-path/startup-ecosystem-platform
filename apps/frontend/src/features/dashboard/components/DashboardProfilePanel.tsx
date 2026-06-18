import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, User } from "lucide-react"

import Button from "../../../components/ui/Button"
import { useAuthStore } from "../../auth/store/auth.store"

function DashboardProfilePanel() {
  const user = useAuthStore((state) => state.user)

  const roleLabel =
    user?.role === "ENTREPRENEUR"
      ? "Founder"
      : user?.role === "STUDENT"
      ? "Student"
      : user?.role === "INVESTOR"
      ? "Investor"
      : user?.role === "FREELANCER"
      ? "Freelancer"
      : user?.role

  return (
    <motion.aside initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="h-full rounded-[2rem] border border-slate-700 bg-[#1E293B]/70 p-6">
      <div className="flex items-center gap-4">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full border border-slate-700 object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F172A] text-[#F8FAFC]">
            <User size={28} />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-[#F8FAFC]">{user?.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-[#94A3B8]">
            <Mail size={14} />
            <span className="truncate">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-y border-slate-700 py-4">
        <span className="text-sm text-[#94A3B8]">Role</span>
        <span className="rounded-full bg-[#6366F1]/15 px-3 py-1 text-sm font-medium text-[#F8FAFC]">{roleLabel}</span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#94A3B8]">Profile strength</span>
          <span className="font-medium text-[#F8FAFC]">65%</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full w-2/3 rounded-full bg-[#6366F1]" />
        </div>

        <p className="mt-3 text-sm leading-6 text-[#94A3B8]">Complete your profile to make your account more useful across the platform.</p>
      </div>

      <Link to="/profile" className="mt-6 block">
        <Button className="w-full">Update Profile</Button>
      </Link>
    </motion.aside>
  )
}

export default DashboardProfilePanel