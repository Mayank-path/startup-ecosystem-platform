function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-[#6366F1]" />
    </div>
  )
}

export default LoadingSpinner