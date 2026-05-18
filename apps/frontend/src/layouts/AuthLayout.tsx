import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

function AuthLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-100 px-4">
      {children}
    </div>
  )
}

export default AuthLayout