import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface Props {
  children: ReactNode
  title: string
  subtitle: string
  footerText: string
  footerLinkText: string
  footerLinkTo: string
}

function AuthLayout({ children, title, subtitle, footerText, footerLinkText, footerLinkTo }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#0F172A] px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-[#1E293B] p-8 shadow-lg shadow-black/20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-[#F8FAFC]">{title}</h1>
          <p className="mt-2 text-[#94A3B8]">{subtitle}</p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          {footerText}{" "}
          <Link to={footerLinkTo} className="font-semibold text-[#6366F1] hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthLayout