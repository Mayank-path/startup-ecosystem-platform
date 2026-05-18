import { Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-100">
      <div className="mx-auto max-w-5xl p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout