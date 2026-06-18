import { Link } from "react-router-dom"
import Button from "../components/ui/Button"

function HomePage() {
  const platformSteps = [
    "Create a role-based account",
    "Build your student, investor, freelancer, or startup profile",
    "Explore startups, jobs, and opportunities",
    "Apply, post, review, connect, or collaborate",
  ]

  return (
    <main className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#6366F1]/25 blur-3xl" />
        <div className="absolute -left-24 top-40 h-[360px] w-[360px] rounded-full bg-[#F59E0B]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="w-fit rounded-full border border-slate-700 bg-[#1E293B]/80 px-5 py-2 text-sm font-semibold text-[#F59E0B]">
              Students • Startups • Investors • Freelancers
            </p>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Where startup ideas meet talent, capital, and opportunity.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-[#94A3B8]">
              A role-based ecosystem platform for discovering startups, posting
              opportunities, applying to jobs, reviewing applicants, and
              connecting people who build.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="rounded-full px-7 py-4">
                  Join Platform
                </Button>
              </Link>

              <Link to="/startups">
                <Button variant="secondary" className="rounded-full px-7 py-4">
                  Explore Startups
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm">
              <div>
                <p className="text-3xl font-black text-[#F59E0B]">4</p>
                <p className="text-[#94A3B8]">User roles</p>
              </div>

              <div>
                <p className="text-3xl font-black text-[#F8FAFC]">Live</p>
                <p className="text-[#94A3B8]">Jobs & startups</p>
              </div>

              <div>
                <p className="text-3xl font-black text-[#6366F1]">Role</p>
                <p className="text-[#94A3B8]">Based dashboards</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rotate-3 rounded-[2.5rem] bg-[#6366F1]" />

            <div className="relative rounded-[2.5rem] bg-[#020617] p-6 shadow-2xl">
              <div className="rounded-[2rem] border border-slate-700 bg-[#1E293B] p-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <p className="text-sm text-[#94A3B8]">
                      Ecosystem workspace
                    </p>
                    <h2 className="text-xl font-bold text-[#F8FAFC]">
                      StartupHub
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-bold text-[#0F172A]">
                    Active
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="rounded-3xl border border-slate-700 bg-[#0F172A] p-5">
                    <p className="text-sm text-[#94A3B8]">Opportunity</p>
                    <h3 className="mt-2 text-2xl font-black text-[#F8FAFC]">
                      Frontend Intern
                    </h3>
                    <p className="mt-2 text-[#94A3B8]">
                      React • Tailwind • Remote
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-[#6366F1] p-5 text-white">
                      <p className="text-sm opacity-80">Applicants</p>
                      <h3 className="mt-2 text-3xl font-black">18</h3>
                    </div>

                    <div className="rounded-3xl bg-[#F59E0B] p-5 text-[#0F172A]">
                      <p className="text-sm opacity-70">Status</p>
                      <h3 className="mt-2 text-3xl font-black">Open</h3>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-700 bg-[#0F172A] p-5">
                    <p className="text-sm font-semibold text-[#F8FAFC]">
                      Startup profile published
                    </p>
                    <p className="mt-2 text-sm text-[#94A3B8]">
                      Ready for discovery, hiring, and collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-700 bg-[#111827] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
              How it works
            </p>
            <h2 className="mt-5 text-5xl font-black leading-tight">
              One ecosystem, different paths.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#94A3B8]">
              Each role enters the platform with a different goal, but all
              workflows connect around startups and opportunities.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <h3 className="text-4xl font-black">Students</h3>
              <p className="border-l-4 border-[#6366F1] pl-6 text-xl leading-9 text-[#94A3B8]">
                Discover startup jobs, apply with resumes, and track application
                status from one dashboard.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <h3 className="text-4xl font-black">Startups</h3>
              <p className="border-l-4 border-[#F59E0B] pl-6 text-xl leading-9 text-[#94A3B8]">
                Create startup profiles, post openings, manage jobs, and review
                applicants.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <h3 className="text-4xl font-black">Investors</h3>
              <p className="border-l-4 border-[#6366F1] pl-6 text-xl leading-9 text-[#94A3B8]">
                Discover promising startups, evaluate opportunities, and connect
                with founders seeking growth capital.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <h3 className="text-4xl font-black">Freelancers</h3>
              <p className="border-l-4 border-[#F59E0B] pl-6 text-xl leading-9 text-[#94A3B8]">
                Showcase skills and connect with startups looking for flexible
                project-based support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
              Platform flow
            </p>
            <h2 className="mt-5 text-5xl font-black leading-tight">
              From discovery to action.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#94A3B8]">
              The platform is designed around practical workflows, not just
              static profiles.
            </p>
          </div>

          <div className="space-y-6">
            {platformSteps.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-6 border-b border-slate-700 pb-6"
              >
                <span className="text-5xl font-black text-[#F59E0B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-xl font-semibold text-[#F8FAFC]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-700 bg-[#111827] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#6366F1]">
                Why this platform
              </p>
              <h2 className="mt-5 text-5xl font-black leading-tight">
                Less scattered workflows. More connected growth.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-[#94A3B8]">
              <p>
                Startups usually manage hiring, discovery, applications and
                collaboration across multiple disconnected tools.
              </p>
              <p>
                This platform brings those workflows into one role-based product
                experience for students, startups, investors and freelancers.
              </p>
            </div>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] bg-[#6366F1] p-10 text-white">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-black">
                  Join the ecosystem today.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                  Create your account and start discovering opportunities,
                  startups, talent and collaborations.
                </p>
              </div>

              <Link to="/register">
                <Button
                  variant="light"
                  className="rounded-full px-7 py-4 font-bold"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage