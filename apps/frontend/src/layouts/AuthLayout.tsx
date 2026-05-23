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

function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
}: Props) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="mt-2 text-gray-600">
            {subtitle}
          </p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            to={footerLinkTo}
            className="font-semibold text-black hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthLayout