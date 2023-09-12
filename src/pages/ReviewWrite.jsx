import ReviewKeyword from '@c/Review/ReviewKeyword';
import Button from '@c/Review/Button';
import VisitedPlace from '@c/Review/VisitedPlace';
import Input from '@c/review/Input';
import ReviewPhoto from '@c/Review/ReviewPhoto';

function ReviewWrite() {
  return (
    <>
    <form className="flex flex-col gap-4 flex-wrap mx-auto max-w-3xl mt-4">
      <VisitedPlace/>
      <Input label="리뷰를 남겨주세요" placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"/>
      <ReviewPhoto/>
      <ReviewKeyword/>
      <div className="flex gap-2">
        <Button type="cancel" text="취소하기" bgColor="bg-gray-100" textColor="text-red-500"/>
        <Button type="submit" text="등록하기"/>
      </div>
    </form>
    </>
  )
}

export default ReviewWrite