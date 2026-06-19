import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  PlusCircle,
  Users,
} from "lucide-react"

import { useAuthStore } from "../../auth/store/auth.store"

function DashboardQuickActions() {
  const user = useAuthStore((state) => state.user)

  const entrepreneurActions = [
    {
      title: "My Startups",
      description: "Manage your startup profiles.",
      icon: Building2,
      link: "/my-startups",
    },
    {
      title: "Create Startup",
      description: "Launch a new startup profile.",
      icon: PlusCircle,
      link: "/startups/create",
    },
    {
      title: "Posted Jobs",
      description: "Review jobs from your startups.",
      icon: Briefcase,
      link: "/my-startups",
    },
    {
      title: "Explore Startups",
      description: "Discover other startups.",
      icon: Users,
      link: "/startups",
    },
    {
      title: "Explore Jobs",
      description: "Browse platform jobs.",
      icon: FileText,
      link: "/jobs",
    },
  ]

  const studentActions = [
    {
      title: "Explore Jobs",
      description: "Browse startup jobs and internships.",
      icon: Briefcase,
      link: "/jobs",
    },
    {
      title: "My Applications",
      description: "Track jobs you applied to.",
      icon: FileText,
      link: "/applications",
    },
    {
      title: "Explore Startups",
      description: "Discover founders and companies.",
      icon: Building2,
      link: "/startups",
    },
  ]

  const investorActions = [
    {
      title: "Explore Startups",
      description: "Discover startups looking for growth.",
      icon: Building2,
      link: "/startups",
    },
    {
      title: "My Watchlist",
      description: "View startups you saved for later.",
      icon: Bookmark,
      link: "/investors/watchlist",
    },
    {
      title: "Explore Jobs",
      description: "Browse opportunities across startups.",
      icon: Briefcase,
      link: "/jobs",
    },
  ]

  let actions = studentActions

  if (user?.role === "ENTREPRENEUR" || user?.role === "ADMIN") {
    actions = entrepreneurActions
  } else if (user?.role === "INVESTOR") {
    actions = investorActions
  }

  return (
    <section>
      <div className="mb-6 flex items-end justify-between border-b border-slate-700 pb-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
            Shortcuts
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#F8FAFC]">
            Next actions
          </h2>
        </div>
      </div>

      <div className="divide-y divide-slate-700 rounded-[2rem] border border-slate-700 bg-[#1E293B]/70">
        {actions.map((action, index) => {
          const Icon = action.icon

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}
            >
              <Link
                to={action.link}
                className="group flex items-center justify-between gap-5 p-5 transition hover:bg-[#0F172A]/70 first:rounded-t-[2rem] last:rounded-b-[2rem]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F172A] text-[#6366F1]">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#F8FAFC]">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#94A3B8]">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 text-[#94A3B8] transition group-hover:translate-x-1 group-hover:text-[#6366F1]"
                />
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default DashboardQuickActions