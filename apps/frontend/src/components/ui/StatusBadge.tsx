interface Props {
  status: string
}

function StatusBadge({ status }: Props) {
  const styles = {
    PENDING: "border border-yellow-500/30 bg-yellow-500/15 text-yellow-300",
    REVIEWED: "border border-blue-500/30 bg-blue-500/15 text-blue-300",
    ACCEPTED: "border border-green-500/30 bg-green-500/15 text-green-300",
    REJECTED: "border border-red-500/30 bg-red-500/15 text-red-300",
  }

  return (
    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${styles[status as keyof typeof styles] || "border border-slate-700 bg-[#1E293B] text-[#94A3B8]"}`}>
      {status}
    </span>
  )
}

export default StatusBadge