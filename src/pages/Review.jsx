import ReviewKeyword from '@c/review/ReviewKeyword';
import Button from '@c/review/Button';
import VisitedPlace from '@c/review/VisitedPlace';
import Input from '@c/review/Input';
import ReviewPhoto from '@c/review/ReviewPhoto';
import { MdOutlineCancel } from "react-icons/md";

function Review() {
  return (
    <>
    {/* <BiX className="w-7 h-7 text-primary float-right"/> */}
    <form className="flex flex-col gap-4 flex-wrap mx-auto max-w-3xl">
      <button type="button" aria-label="작성취소"><MdOutlineCancel className="w-7 h-7 text-primary float-right ml-auto"/></button>
      <VisitedPlace/>
      <Input label="리뷰를 남겨주세요" placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"/>
      <ReviewPhoto/>
      <ReviewKeyword/>
      <Button type="submit" text="등록하기"/>
    </form>
    </>
  )
}

export default Review