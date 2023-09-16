import useReviewStore from '@/store/review';

function useReview() {

  const { reviewData, setReviewData } = useReviewStore();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('name은', name);
    console.log('value는', value);
    
    setReviewData({ [name]: value });
    console.log(reviewData);
  };

  return {reviewData, setReviewData, handleInputChange};
}

export default useReview