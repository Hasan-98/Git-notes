import styles from "./Grist.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
};

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  pageSize = 8,
  totalItems = 0
}: Props) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };


  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles["grist__pagination"]}>
      <div className={styles["pagination-info"]}>
        Showing {startItem} to {endItem} of {totalItems} items
      </div>
      
      <div className={styles["pagination-controls"]}>
        <button
          className={styles["grist__pagination--button"]}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button
          className={styles["grist__pagination--button"]}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

    </div>
  );
}