import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366F1] text-xs font-black text-white">
                SX
              </div>

              <h3 className="text-lg font-black text-[#F8FAFC]">
                Startup Ecosystem
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
              Connecting startups, students, investors,
              and freelancers through opportunities,
              hiring, collaboration, and innovation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#F8FAFC]">
              Platform
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/" className="text-[#94A3B8] transition hover:text-[#F8FAFC]">
                Home
              </Link>

              <Link to="/startups" className="text-[#94A3B8] transition hover:text-[#F8FAFC]">
                Startups
              </Link>

              <Link to="/jobs" className="text-[#94A3B8] transition hover:text-[#F8FAFC]">
                Jobs
              </Link>

              <Link to="/dashboard" className="text-[#94A3B8] transition hover:text-[#F8FAFC]">
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#F8FAFC]">
              Ecosystem
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-sm text-[#94A3B8]">
              <span>Students</span>
              <span>Startups</span>
              <span>Investors</span>
              <span>Freelancers</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#F8FAFC]">
              About
            </h4>

            <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
              A role-based platform built to simplify
              startup discovery, hiring, applications,
              networking, and collaboration.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-700 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} Startup Ecosystem. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#6366F1]">Build</span>
            <span className="text-[#F59E0B]">Hire</span>
            <span className="text-[#94A3B8]">Connect</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer