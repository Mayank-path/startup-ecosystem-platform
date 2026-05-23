interface Props {
    title: string
    description?: string
    action?: React.ReactNode
  }
  
  function EmptyState({
    title,
    description,
    action,
  }: Props) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
  
        {description && (
          <p className="mt-2 text-gray-600">
            {description}
          </p>
        )}
  
        {action && (
          <div className="mt-5">
            {action}
          </div>
        )}
      </div>
    )
  }
  
  export default EmptyState