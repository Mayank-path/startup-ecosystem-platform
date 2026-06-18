import Button from "./Button"

interface Props {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

function Pagination({ currentPage, totalPages, onPrevious, onNext }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="secondary" disabled={currentPage === 1} onClick={onPrevious}>Previous</Button>
      <div className="rounded-full border border-slate-700 bg-[#1E293B] px-4 py-2">
        <span className="text-sm font-medium text-[#94A3B8]">Page <span className="text-[#F8FAFC]">{currentPage}</span> of <span className="text-[#F8FAFC]">{totalPages}</span></span>
      </div>
      <Button variant="secondary" disabled={currentPage === totalPages} onClick={onNext}>Next</Button>
    </div>
  )
}

export default Pagination