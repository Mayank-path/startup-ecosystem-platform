import {
  Link,
  useNavigate,
} from "react-router-dom"

import {
  logoutUser,
} from "../features/auth/api/auth.api"

import {
  useAuthStore,
} from "../features/auth/store/auth.store"

function Navbar() {
  const navigate = useNavigate()

  const user = useAuthStore(
    (state) => state.user
  )

  const logout = useAuthStore(
    (state) => state.logout
  )

  const handleLogout = async () => {
    try {
      await logoutUser()

      logout()

      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          Startup Ecosystem
        </Link>

        <div className="flex items-center gap-5">
          <Link to="/startups" className="text-sm font-medium text-gray-700 hover:text-black">
            Explore
          </Link>

          <Link to="/jobs" className="text-sm font-medium text-gray-700 hover:text-black">
            Jobs
          </Link>

          {user ? (
            <>
              {user.role === "STUDENT" && (
                <Link to="/applications" className="text-sm font-medium text-gray-700 hover:text-black">
                  My Applications
                </Link>
              )}

              {(user.role === "ENTREPRENEUR" || user.role === "ADMIN") && (
                <>
                  <Link to="/my-startups" className="text-sm font-medium text-gray-700 hover:text-black">
                    My Startups
                  </Link>

                  <Link to="/startups/create" className="text-sm font-medium text-gray-700 hover:text-black">
                    Create Startup
                  </Link>
                </>
              )}

              <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-black">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black">
                Login
              </Link>

              <Link to="/register" className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar