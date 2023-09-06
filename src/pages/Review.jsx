import ReviewKeyword from '@/components/ReviewKeyword';
import Button from '@/components/Button';

function Review() {
  return (
    <>
    <ul>
      <ReviewKeyword/>
    </ul>
    <Button type='button' text='등록하기'/>
    </>
  )
}

export default Review