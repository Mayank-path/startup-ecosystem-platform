interface Props {
    status: string
  }
  
  function StatusBadge({
    status,
  }: Props) {
    const styles = {
      PENDING:
        "bg-yellow-100 text-yellow-700",
  
      REVIEWED:
        "bg-blue-100 text-blue-700",
  
      ACCEPTED:
        "bg-green-100 text-green-700",
  
      REJECTED:
        "bg-red-100 text-red-700",
    }
  
    return (
      <span
        className={`rounded-full px-4 py-2 text-sm font-medium ${
          styles[
            status as keyof typeof styles
          ] ||
          "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    )
  }
  
  export default StatusBadge