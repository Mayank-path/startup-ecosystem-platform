import { Link, useLocation, useNavigate } from "react-router-dom"

import { logoutUser } from "../features/auth/api/auth.api"
import { useAuthStore } from "../features/auth/store/auth.store"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Startups", path: "/startups" },
    { label: "Jobs", path: "/jobs" },
    ...(user ? [{ label: "Dashboard", path: "/dashboard" }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-[#0F172A]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <div className="flex flex-1 items-center">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366F1] text-xs font-black text-white transition group-hover:rotate-6">
              SX
            </div>

            <p className="text-lg font-black tracking-tight text-[#F8FAFC]">
              Startup Ecosystem
            </p>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold transition ${
                  isActive
                    ? "text-[#6366F1]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#6366F1]" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden rounded-full border border-slate-700 bg-[#1E293B] px-4 py-2 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#6366F1] hover:text-[#6366F1] sm:block"
              >
                {user.name}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-[#94A3B8] transition hover:text-[#F8FAFC]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar