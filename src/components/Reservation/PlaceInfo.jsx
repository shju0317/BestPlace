import { useLocation } from 'react-router-dom';
// import useReview from '@h/useReview';
import useReviewStore from '@s/review';
import { useEffect } from 'react';

function PlaceInfo() {
  const { title, category, address } = useLocation().state || {};
  const { setReviewData } = useReviewStore();
  
  useEffect(() => {
    setReviewData({ title: title });
  }, []);

  return (
    <div className="border-b pb-2 w-full">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p>{category}<span className="mx-1">|</span>{address}</p>
    </div>
  )
}

export default PlaceInfo