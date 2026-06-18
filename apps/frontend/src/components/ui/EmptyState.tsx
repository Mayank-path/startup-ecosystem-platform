interface Props {
  title: string
  description?: string
  action?: React.ReactNode
}

function EmptyState({ title, description, action }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#1E293B] p-10 text-center">
      <h2 className="text-xl font-semibold text-[#F8FAFC]">{title}</h2>
      {description && <p className="mt-2 text-[#94A3B8]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export default EmptyState