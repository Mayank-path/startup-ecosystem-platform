interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  )
}

export default Input