interface Props {
  title?: string
  description?: string
}

function ErrorState({ title = "Something went wrong", description = "Please try again later." }: Props) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
      <h2 className="text-xl font-semibold text-red-400">{title}</h2>
      <p className="mt-2 text-sm text-red-300">{description}</p>
    </div>
  )
}

export default ErrorState