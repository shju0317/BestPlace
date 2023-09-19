import { pb } from '@/api/pocketbase';
import ReviewKeyword from '@c/Review/ReviewKeyword';
import Button from '@c/Review/Button';
import VisitedPlace from '@c/Review/VisitedPlace';
import Input from '@c/Review/Input';
import ReviewPhoto from '@c/Review/ReviewPhoto';
import { useNavigate } from 'react-router-dom';
import useReview from '@h/useReview';
import { alertMessage } from '@u/index';

function ReviewWrite() {
  const navigate = useNavigate();
  
  const {handleInputChange, reviewData} = useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    for (const [key, value] of Object.entries(reviewData)) {
      if (value) {
        if (key === "photos" || key === "keywords") {
          // - 파일 리스트를 순환해 파일 정보 추가 설정 
          //   (여러 데이터의 경우 아래처럼 추가해야 함)
          for (let item of value) {
            formData.append(key, item);
          }
        }else {
          formData.append(key, value);
        }
      }
    }
  
    // 현재 UI에서 정보를 받는 기능이 없어 더미 데이터 추가 필요
    // - 로그인 사용자 ID 필요
    formData.append("writer", "puppy0123456789"); // 댕이, users59138
    // - 키워드 선택 필요 (여러 데이터의 경우 아래처럼 추가해야 함 또는 파일리스트처럼 반복문 활용)
    // formData.append("keywords", "kind");
    // formData.append("keywords", "tasty");
    // - 장소 정보 추가 필요
    formData.append("place", "zxuv5vm0v8b5wph"); // 치히로 서울홍대점
  
    try {
      await pb.collection("reviews").create(formData);
      alertMessage("리뷰가 등록되었습니다.");
      navigate("/review"); // 리디렉션
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.","❗");
      console.log(error);
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
