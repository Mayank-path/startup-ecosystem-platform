interface CardProps {
    children: React.ReactNode
    className?: string
  }
  
  function Card({ children, className = "" }: CardProps) {
    return (
      <div className={`rounded-2xl border bg-white p-8 shadow-sm ${className}`}>
        {children}
      </div>
    )
  }
  
  export default Card