interface CardProps {
    children: React.ReactNode
    className?: string
  }
  
  function Card({ children, className = "" }: CardProps) {
    return (
      <div
        className={`rounded-2xl border border-slate-700/80 bg-[#1E293B] p-8 shadow-lg shadow-black/10 ${className}`}
      >
        {children}
      </div>
    )
  }
  
  export default Card