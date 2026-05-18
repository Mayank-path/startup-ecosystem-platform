interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
  }
  
  function Button({ children, className = "", ...props }: ButtonProps) {
    return (
      <button
        className={`rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  export default Button