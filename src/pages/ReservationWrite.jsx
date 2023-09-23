import { pb } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import Header from '@l/header';
import ReservationGuestCount from '@c/Reservation/ReservationGuestCount';
import ReservationGuestInfo from '@c/Reservation/ReservationGuestInfo';
import ReservationDate from '@c/Reservation/ReservationDate';
import PlaceInfo from '@c/Reservation/PlaceInfo';
import ScrollToTop from '@c/ScrollTop';
import Button from '@c/Button';
import useReservation from '@h/useReservation';
import { alertMessage, isEmailRegValid, isTelRegValid } from '@u/index';


function ReservationWrite() {
  const navigate = useNavigate();
  const {reservationData, resetReservationData} = useReservation();

  const isValid = (reservationData) => {
    for (const key in reservationData) {
      if(key === "canceled" || key === "visited") break;

      const value = reservationData[key];

      if (!value && value !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (true) {
      case !isValid(reservationData):
        alertMessage("공백란이 있습니다.", "❗");
        return;
    
      case !isEmailRegValid(reservationData.email):
        alertMessage("이메일 정보가 올바르지 않습니다.", "❗");
        return;
    
      case !isTelRegValid(reservationData.tel):
        alertMessage("전화번호 정보가 올바르지 않습니다.", "❗");
        return;
    }
    
    try {
      await pb.collection('reservation').create(reservationData);
      alertMessage("예약이 등록되었습니다.");
      resetReservationData();
      navigate("/reservation");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.","❗");
      console.error('데이터 전송 실패:', error);
    }
  };

  const handleGoBack = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      // navigate("/reservation");
      resetReservationData();
      navigate(-1);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
    <ScrollToTop/>
    <Header/>
    <section className="gap-4 flex-wrap mx-auto max-w-3xl mt-4 my-8">
      <h2 className="hidden">가게정보</h2>
      <PlaceInfo/>
    </section>
    <section>
      <h2 className="text-lg text-center font-semibold mb-4">예약정보를 입력하세요</h2>
      <form method="POST" className="flex flex-col">
        <ReservationDate/>
        <ReservationGuestCount/>
        <ReservationGuestInfo/>
        <div className="flex gap-2">
          <Button text="취소하기" onClick={handleGoBack} bgColor="bg-gray-100" textColor="text-red-500"/>
          <Button type="submit" text="등록하기" onClick={handleSubmit}/>
        </div>
      </form>
    </section>
  </div>
  )
}

export default ReservationWrite