import styles from "./Grist.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
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

  return (
    <div className={styles["grist__pagination"]}>
      <button
        className={styles["grist__pagination--button"]}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>Page</span>
      <input
        className={styles["grist__pagination--input"]}
        type="number"
        value={currentPage}
        onChange={(e) => {
          const page = parseInt(e.target.value);
          if (!isNaN(page) && page > 0 && page <= totalPages) {
            onPageChange(page);
          }
        }}
      />
      <span>of {totalPages}</span>
      <button
        className={styles["grist__pagination--button"]}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}