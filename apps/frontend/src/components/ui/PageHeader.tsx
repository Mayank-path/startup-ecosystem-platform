interface Props {
    title: string
    subtitle?: string
    action?: React.ReactNode
  }
  
  function PageHeader({
    title,
    subtitle,
    action,
  }: Props) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {title}
          </h1>
  
          {subtitle && (
            <p className="mt-2 text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
  
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
    )
  }
  
  export default PageHeader