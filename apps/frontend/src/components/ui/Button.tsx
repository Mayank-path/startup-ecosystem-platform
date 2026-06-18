interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger" | "light"
}

function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#6366F1] text-[#F8FAFC] hover:bg-[#4F46E5] focus:ring-[#6366F1]/30",

    secondary:
      "border border-slate-700 bg-[#1E293B] text-[#F8FAFC] hover:border-[#6366F1] hover:bg-[#243247] focus:ring-[#6366F1]/20",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400/30",

    light:
      "bg-[#F8FAFC] text-[#0F172A] hover:bg-slate-200 focus:ring-slate-300",
  }

  return (
    <button
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button