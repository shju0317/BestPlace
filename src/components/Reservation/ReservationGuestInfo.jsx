import useReservation from '@h/useReservation';
import WriteText from '@c/WriteText';

function ReservationGuestInfo() {
  const { handleInputChange, reservationData } = useReservation();

  return (
    <>
      <div className="flex flex-col gap-4 border-b p-4 mb-4">
        <label htmlFor="guestInfo" className="text-lg font-semibold">예약자 정보</label>
        <div id="guestInfo" className="flex flex-col gap-4 ml-4 font-semibold">
          <div className="flex items-center gap-4">
            <label htmlFor="reservedName" className="w-1/6">예약명</label>
            <input type="text" id="reservedName" name="reservedName"
              inputMode="text" 
              onChange={handleInputChange}
              className="rounded border border-primary px-4 py-2 w-5/6"/>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="tel" className="w-1/6">연락처</label>
            <input type="tel" id="tel" name="tel" placeholder="전화번호를 입력하세요"
              inputMode="tel"
              onChange={handleInputChange}
              className="rounded border border-primary px-4 py-2 w-5/6"/>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="reservedName" className="w-1/6">이메일</label>
            <input type="email" id="reservedName" name="email" placeholder="example@naver.com"
            inputMode="email"
            onChange={handleInputChange}
            className="rounded border border-primary px-4 py-2 w-5/6"/>
          </div>
          <div className="flex items-center gap-8">
            <label htmlFor="requirements" className="w-1/6">요청사항</label>
            <WriteText id="requirements" name="requirements" placeholder="업체에 요청하실 내용을 적어주세요"
            inputMode="text" 
            onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ReservationGuestInfo