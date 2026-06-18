import { Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0F172A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_40%)]" />

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout