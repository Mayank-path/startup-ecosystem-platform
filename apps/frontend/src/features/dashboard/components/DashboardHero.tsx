import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import Button from "../../../components/ui/Button"
import { useAuthStore } from "../../auth/store/auth.store"

function DashboardHero() {
  const user = useAuthStore((state) => state.user)

  const roleText =
    user?.role === "ENTREPRENEUR"
      ? "Manage your startups, jobs, and applicant pipeline."
      : user?.role === "INVESTOR"
      ? "Discover startups and explore emerging ventures."
      : user?.role === "FREELANCER"
      ? "Find startup opportunities and collaboration work."
      : "Find opportunities, track applications, and explore startups."

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="border-b border-slate-700 pb-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">Workspace</p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-[#F8FAFC] md:text-6xl">
            Welcome back, <span className="text-[#6366F1]">{user?.name}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#94A3B8]">{roleText}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/jobs">
            <Button>Explore Jobs</Button>
          </Link>

          <Link to="/startups">
            <Button variant="secondary">Explore Startups</Button>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

export default DashboardHero