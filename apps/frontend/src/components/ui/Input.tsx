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
      className={`w-full rounded-xl border px-4 py-3 text-sm transition outline-none ${
        error
          ? "border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10"
      } ${
        disabled
          ? "cursor-not-allowed bg-gray-100 opacity-60"
          : "bg-white"
      } ${className}`}
      {...props}
    />
  )
}

export default Input