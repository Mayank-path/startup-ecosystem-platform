interface Props {
    title?: string
    description?: string
  }
  
  function ErrorState({
    title = "Something went wrong",
    description = "Please try again later.",
  }: Props) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-red-700">
          {title}
        </h2>
  
        <p className="mt-2 text-sm text-red-600">
          {description}
        </p>
      </div>
    )
  }
  
  export default ErrorState