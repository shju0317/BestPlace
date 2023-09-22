import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useReviewStore from '@s/review';

function VisitedPlaceInfo() {
  const { userId, item } = useLocation().state || {};
  const { setReviewData } = useReviewStore();

  console.log('아이템', item);
  console.log('아이템아이디', item.expand.id);
  useEffect(() => {
    setReviewData({ 
      writer: userId,
      place: item.expand.place.id,
      reservation: item.id
      // title: item.expand.place.title
    });
  }, []);

  return (
    <div className="border-b pb-2 w-full">
      <h1 className="text-lg font-semibold">{item.expand.place.title}</h1>
      <p>{item.expand.place.category}<span className="mx-1">|</span>{item.expand.place.address}</p>
    </div>
  );
}

export default VisitedPlaceInfo;