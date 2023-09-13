import ReviewKeyword from '@c/Review/ReviewKeyword';
import Button from '@c/Review/Button';
import VisitedPlace from '@c/Review/VisitedPlace';
import Input from '@c/review/Input';
import ReviewPhoto from '@c/Review/ReviewPhoto';
import useReviewStore from '@h/useReviewStore';

function ReviewWrite() {
  // const { reviewData, setReviewData } = useReviewStore();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     // PocketBase SDK 메서드 호출 및 데이터 전송
  //     await pocketbase.sendData(reviewData);

  //     // 전송 후 필요한 처리 로직 추가
  //     console.log('데이터 전송 성공!');

  //     // 폼 초기화 또는 리디렉션 등 필요한 동작 수행
  //     setReviewData({
  //       place: '',
  //       reviewText: '',
  //       photos: []
  //     });
  //   } catch (error) {
  //     console.error('데이터 전송 실패:', error);
  //   }
  // };

  return (
    <>
    <form className="flex flex-col gap-4 flex-wrap mx-auto max-w-3xl mt-4">
      <VisitedPlace/>
      <Input label="리뷰를 남겨주세요" placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"/>
      <ReviewPhoto/>
      <ReviewKeyword/>
      <div className="flex gap-2">
        <Button type="cancel" text="취소하기" bgColor="bg-gray-100" textColor="text-red-500"/>
        <Button type="submit" text="등록하기" onClick="handleSubmit"/>
      </div>
    </form>
    </>
  )
}

export default ReviewWrite