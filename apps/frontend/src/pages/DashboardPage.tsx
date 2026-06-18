import DashboardHero from "../features/dashboard/components/DashboardHero"
import DashboardProfilePanel from "../features/dashboard/components/DashboardProfilePanel"
import DashboardStats from "../features/dashboard/components/DashboardStats"
import DashboardQuickActions from "../features/dashboard/components/DashboardQuickActions"

function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <DashboardHero />
        <DashboardProfilePanel />
      </div>

      <DashboardStats />

      <DashboardQuickActions />
    </div>
  )
}

export default DashboardPage