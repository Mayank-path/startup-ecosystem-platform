interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
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
      "bg-black text-white hover:bg-gray-800 focus:ring-black/20",
    secondary:
      "border border-gray-300 bg-white text-black hover:bg-gray-100 focus:ring-gray-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  }

  return (
    <button
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button