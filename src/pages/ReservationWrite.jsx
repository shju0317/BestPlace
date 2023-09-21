import { pb } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import ReservationGuestCount from '@c/Reservation/ReservationGuestCount';
import ReservationGuestInfo from '@c/Reservation/ReservationGuestInfo';
import ReservationDate from '@c/Reservation/ReservationDate';
import PlaceInfo from '@c/Reservation/PlaceInfo';
import ScrollToTop from '@c/ScrollTop';
import Button from '@c/Button';
import useReservation from '@h/useReservation';
import { alertMessage } from '@u/index';


function ReservationWrite() {
  const navigate = useNavigate();
  const {reservationData} = useReservation();

  const isValid = () =>{
    window.confirm("확인")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection('reservation').create(reservationData);
      alertMessage("예약이 등록되었습니다.");
      navigate("/reservation");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.","❗");
      console.error('데이터 전송 실패:', error);
    }
  };

  const handleGoBack = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <>
    <ScrollToTop/>
    <section className="gap-4 flex-wrap mx-auto max-w-3xl mt-4 my-8">
      <h1 className="hidden">가게정보</h1>
      <PlaceInfo/>
    </section>
    <section>
      <h1 className="text-lg text-center font-semibold mb-4">예약정보를 입력하세요</h1>
      <form method="POST" className="flex flex-col">
        <ReservationDate/>
        <ReservationGuestCount/>
        <ReservationGuestInfo/>
        <div className="flex gap-2">
          <Button text="취소하기" onClick={handleGoBack} bgColor="bg-gray-100" textColor="text-red-500"/>
          <Button type="submit" text="등록하기" onClick={handleSubmit} disabled={!isValid}/>
        </div>
      </form>
    </section>
  </>
  )
}

export default ReservationWrite