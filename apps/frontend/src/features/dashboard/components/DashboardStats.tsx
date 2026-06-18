import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Building2, FileText, Activity } from "lucide-react"

import LoadingSpinner from "../../../components/ui/LoadingSpinner"
import { getDashboardStats } from "../api/dashboard.api"

interface DashboardStatsData {
  totalJobs: number
  totalStartups: number
  totalApplications: number
  pendingApplications: number
  acceptedApplications: number
  rejectedApplications: number
}

function DashboardStats() {
  const [statsData, setStatsData] = useState<DashboardStatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats()
        setStatsData(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) return <LoadingSpinner />

  const stats = [
    {
      label: "Applications",
      value: statsData?.totalApplications || 0,
      icon: FileText,
    },
    {
      label: "Pending",
      value: statsData?.pendingApplications || 0,
      icon: Activity,
    },
    {
      label: "Accepted Roles",
      value: statsData?.acceptedApplications || 0,
      icon: Briefcase,
    },
    {
      label: "Applied Startups",
      value: statsData?.totalStartups || 0,
      icon: Building2,
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[2rem] border border-slate-700 bg-[#1E293B]/70"
    >
      <div className="grid divide-y divide-slate-700 md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="flex items-center justify-between gap-4 p-6"
            >
              <div>
                <p className="text-sm text-[#94A3B8]">{stat.label}</p>
                <p className="mt-2 text-3xl font-black text-[#F8FAFC]">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F172A] text-[#6366F1]">
                <Icon size={20} />
              </div>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default DashboardStats