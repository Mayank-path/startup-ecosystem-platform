interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

function Input({
  className = "",
  error = false,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      disabled={disabled}
      className={`w-full rounded-xl border bg-[#1E293B] px-4 py-3 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#94A3B8] ${
        error
          ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
          : "border-slate-700 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
      } ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : ""
      } ${className}`}
      {...props}
    />
  )
}

export default Input