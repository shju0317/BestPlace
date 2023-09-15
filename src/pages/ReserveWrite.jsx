import Button from '@c/Review/Button';
import { useNavigate } from 'react-router-dom';
import Date from '@/components/Reservation/Date';
import Time from '@/components/Reservation/Time';

function ReserveWrite() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   await pb.collection('reviews').create(reviewData);

    //   // 토스트 추가하기
    //   console.log('데이터 전송 성공!');

    //   navigate("/리뷰"); // 리디렉션

    // } catch (error) {
    //   console.error('데이터 전송 실패:', error);
    // }
  };
  
  const handleGoBack = () => navigate(-1); // 이전 페이지로 이동


  return (
    <>
    <section>
      <h1 className="hidden">가게정보</h1>
      <div>
        <h1 className="text-center after:border-b-2 font-semibold text-lg">미장플라쎄</h1>
        <p>예약순서에 따라 창가쪽 좌석 우선 배치됩니다</p>
      </div>
    </section>
    <section>
      <h1>예약정보</h1>
      <form method="POST">
        <div>
          <label htmlFor="">날짜</label>
          <Date/>
        </div>
          
        <div>
          <label htmlFor="">시간 </label>
          <Time/>
        </div>
        <label htmlFor="">인원</label>
        <input type="text" />
        <div className="flex gap-2">
          <Button text="취소하기" onClick={handleGoBack} bgColor="bg-gray-100" textColor="text-red-500"/>
          <Button type="submit" text="등록하기" onClick={handleSubmit}/>
        </div>
      </form>
    </section>
  </>

  )
}

export default ReserveWrite