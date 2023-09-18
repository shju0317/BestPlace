import { pb } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from 'date-fns';
import toast from 'react-hot-toast';
import Button from '@c/Review/Button';
import VisitedPlace from '@c/Review/VisitedPlace';
import Input from '@c/Review/Input';
// import PhotoLayout from '@c/Feed/FeedItem/PhotoLayout';
import 'react-calendar/dist/Calendar.css';
import useReservation from '@h/useReservation';

function ReservationWrite() {
  const navigate = useNavigate();
  // const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 21); // 현재 날짜로부터 3주 이내

  const {handleInputChange, reservationData, setReservationData} = useReservation();

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log('날짜g:', date);
    console.log('날짜:', date.toLocaleDateString());
    setReservationData({ [date]: selectedDate });
  };

  const [time, setTime] = useState(
    setHours(setMinutes(new Date(), 0), 9) // 9:00 AM
  );

    
  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
    
  //   return currentDate.getTime() < selectedDate.getTime();
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection('reservation').create(reservationData);

      toast("예약되었습니다.",{
        duration: 2000,
        icon: "✔",
        style:{
          background: "#e0f2fe",
          color: "#000",
          borderRadius: "28px",
          padding: "12px"
        },
        ariaProps:{
          role: "alert",
          'aria-live': 'polite'
        }
      });

      navigate("/예약"); // 리디렉션

    } catch (error) {
      console.error('데이터 전송 실패:', error);
    }
  };
  
  const handleGoBack = () => navigate(-1); // 이전 페이지로 이동

  const [guestCount, setGuestCount] = useState(1);

  const handleGuestCountChange = (e) => {
    const count = +e.target.value;
    setGuestCount(count);
    
  };    

  useEffect(() => {
    console.log(guestCount);
    console.log('여기',selectedDate);
    },[guestCount]
  )

  return (
    <>
    <section className="gap-4 flex-wrap mx-auto max-w-3xl mt-4 my-8">
      <h1 className="hidden">가게정보</h1>
      <VisitedPlace/>
      <div className="flex flex-col gap-4 items-center mt-4 w-full h-80 p-4">
        <div className="w-full h-60 border ">이미지 불러오기!</div>
        <p className="border-t w-full p-4">예약순서에 따라 창가쪽 좌석 우선 배치됩니다.</p>
      </div>
    </section>
    <section>
      <h1 className="text-lg text-center font-semibold mb-4">예약정보를 입력하세요</h1>
      <form method="POST" className="flex flex-col">
        {/* 캘린더 */}
        <div>
          <label htmlFor="date" className="hidden">캘린더</label>
          <Calendar id="date" 
            fortmatShortWeekday={true}
            minDate={new Date()}
            maxDate={maxSelectableDate} 
            dateFormat = "yyyy.MM.dd(eee)"
            onChange={onChange}  
            onClickDay={handleDateClick}
            // locale="en-US"
            prevAriaLabel="이전달"
            prevLabel="<"
            nextAriaLabel="다음달"
            nextLabel=">"
            navigationAriaLive="polite"
            prev2Label={null}
            next2Label={null}
            className="border border-primary p-4 text-center"
          />
        </div>  
        {/* 날짜 */}
        <div className="flex flex-row gap-4 border-b p-4 items-center">
          <label htmlFor="date" className="text-lg font-semibold">날짜</label>
          <input id="date" name="date"
            value={selectedDate && selectedDate.toLocaleDateString()}
            onChange={handleInputChange}/>
        </div>
        {/* 시간 */}
        <div className="flex flex-row gap-4 border-b p-4 items-center">
          <label htmlFor="time" className="text-lg font-semibold">시간</label>
          <DatePicker
            id="time"
            selected={time}
            onChange={(date) => setTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            minTime={new Date().setHours(9, 0)} //오전 9시
            maxTime={new Date().setHours(20, 0)} // 오후 8시
            dateFormat="h:mm aa"
            // filterTime={filterPassedTime}
            className="rounded border border-primary px-4 py-2"
          />
        </div>
        {/* 예약인원 */}
        <div className="flex flex-row gap-4 border-b p-4 items-center">
          <label htmlFor="guestCount" className="text-lg font-semibold">인원</label>
          <input type="number" min="1" max="10" id="guestCount"
            inputMode="numeric"
            className="rounded border border-primary px-4 py-2"/>
          {/* <select id="guestCount" value={guestCount} 
            onChange={handleGuestCountChange}
            className="rounded border border-primary px-4 py-2"
            >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select> */}
          <span>명</span>
        </div>
        {/* 예약자 정보 */}
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
              <input type="tel" id="tel" name="tel" placeholder="숫자만 입력하세요"
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
              <Input id="requirements" name="requirements" placeholder="업체에 요청하실 내용을 적어주세요"
              inputMode="text" 
              onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button text="취소하기" onClick={handleGoBack} bgColor="bg-gray-100" textColor="text-red-500"/>
          <Button type="submit" text="등록하기" onClick={handleSubmit}/>
        </div>
      </form>
    </section>
  </>

  )
}

export default ReservationWrite