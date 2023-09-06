import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationControls = ({ onPrev, onNext, currentPage, totalPages }) => {
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled =
    currentPage >= totalPages || currentPage === totalPages;

  return (
    <div className="container">
      <div className="controls">
        <div>
          <button
            aria-label="Previous page"
            onClick={onPrev}
            disabled={isPrevDisabled}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            aria-label="Next page"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
