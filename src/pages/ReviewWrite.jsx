import { pb } from '@/api/pocketbase';
import ReviewKeyword from '@c/Review/ReviewKeyword';
import Button from '@c/Review/Button';
import VisitedPlace from '@c/Review/VisitedPlace';
import Input from '@c/Review/Input';
import ReviewPhoto from '@c/Review/ReviewPhoto';
import { useNavigate } from 'react-router-dom';
import useReview from '@h/useReview';

function ReviewWrite() {
  const navigate = useNavigate();
  
  const {handleInputChange, reviewData} = useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection('reviews').create(reviewData);

      // 토스트 추가하기
      console.log('데이터 전송 성공!');

      navigate("/리뷰"); // 리디렉션

    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };
  
  const handleGoBack = () => navigate(-1); // 이전 페이지로 이동


  return (
    <>
    <form method="POST" className="flex flex-col gap-4 flex-wrap mx-auto max-w-3xl mt-4">
      <VisitedPlace/>
      <Input label="리뷰를 남겨주세요" 
        placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"
        name="contents"
        value={reviewData.contents}
        onChange={handleInputChange}
      />
      <ReviewPhoto name="photos"/>
      <ReviewKeyword name="keywords"/>
      <div className="flex gap-2">
        <Button text="취소하기" onClick={handleGoBack} bgColor="bg-gray-100" textColor="text-red-500"/>
        <Button type="submit" text="등록하기" onClick={handleSubmit}/>
      </div>
    </form>
    </>
  )
}

export default ReviewWrite