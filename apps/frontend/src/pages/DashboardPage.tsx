import { Link } from "react-router-dom"

import Card from "../components/ui/Card"
import { useAuthStore } from "../features/auth/store/auth.store"

function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Explore opportunities, connect with startups,
          and build your professional ecosystem.
        </p>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/profile">
          <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl font-bold">
              Profile
            </h2>

            <p className="mt-2 text-gray-600">
              View and update your personal profile,
              skills, and portfolio links.
            </p>
          </Card>
        </Link>

        <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-xl font-bold">
            Explore Startups
          </h2>

          <p className="mt-2 text-gray-600">
            Discover innovative startups, founder
            communities, and opportunities.
          </p>
        </Card>

        <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-xl font-bold">
            Jobs & Internships
          </h2>

          <p className="mt-2 text-gray-600">
            Explore startup jobs, internships,
            and student opportunities.
          </p>
        </Card>

        <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
          <h2 className="text-xl font-bold">
            Applications
          </h2>

          <p className="mt-2 text-gray-600">
            Track your applications and opportunity
            status updates.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage