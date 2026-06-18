interface Props {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-700 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-[#F8FAFC]">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-[#94A3B8]">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export default PageHeader