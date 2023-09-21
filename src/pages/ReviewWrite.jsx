import { pb } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import VisitedPlaceInfo from '@c/Review/VisitedPlaceInfo';
import ReviewKeyword from '@c/Review/ReviewKeyword';
import ReviewPhoto from '@c/Review/ReviewPhoto';
import ScrollToTop from '@c/ScrollTop';
import WriteText from '@c/WriteText';
import Button from '@c/Button';
import { alertMessage } from '@u/index';
import useReview from '@h/useReview';


function ReviewWrite() {
  const navigate = useNavigate();
  
  const {handleInputChange, reviewData} = useReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    for (const [key, value] of Object.entries(reviewData)) {
      if (value) {
        if (key === "photos" || key === "keywords") {
          for (let item of value) {
            formData.append(key, item);
          }
        }else {
          formData.append(key, value);
        }
        console.log('여기',formData);
      }
    }
    
    try {
      await pb.collection("reviews").create(formData);
      alertMessage("리뷰가 등록되었습니다.");
      navigate("/review");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.","❗");
      console.log(error);
    }
  };
  
  const handleGoBack = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      navigate(-1);
    }
  }

  return (
    <>
    <ScrollToTop/>
    <form method="POST" className="flex flex-col gap-4 flex-wrap mx-auto max-w-3xl mt-4">
      <VisitedPlaceInfo/>
      <WriteText label="리뷰를 남겨주세요" 
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
