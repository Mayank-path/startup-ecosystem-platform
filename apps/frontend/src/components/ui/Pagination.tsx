interface Props {
    currentPage: number
    totalPages: number
    onPrevious: () => void
    onNext: () => void
  }
  
  import Button from "./Button"
  
  function Pagination({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
  }: Props) {
    return (
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          Previous
        </Button>
  
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
  
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    )
  }
  
  export default Pagination