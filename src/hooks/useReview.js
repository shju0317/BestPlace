import useReviewStore from "@s/review";
import { useCallback, useMemo } from "react";

function useReview() {
  const reviewData = useReviewStore((state) => state.reviewData);
  const setReviewData = useReviewStore((state) => state.setReviewData);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setReviewData({ [name]: value });
    },
    [setReviewData]
  );

  console.log("으음",reviewData);

  return useMemo(
    () => ({ reviewData, setReviewData, handleInputChange }),
    [handleInputChange, reviewData, setReviewData]
  );
}

export default useReview;
