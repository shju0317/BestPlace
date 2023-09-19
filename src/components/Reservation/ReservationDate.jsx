import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useReservation from '@h/useReservation';

function ReservationDate() {

  const {handleInputChange, reservationData, setReservationData} = useReservation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 21); // 현재 날짜로부터 3주 이내

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; // '2023-00-00' 형식으로 변환
    setReservationData({ "date": formattedDate });
  
  };

  // useEffect((date) => {
  //   let formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; // '2023-00-00' 형식으로 변환
  //   setReservationData({ "date": formattedDate });
  //   },[selectedDate]
  // )

  return (
    <>
      <div>
        <label htmlFor="date" className="hidden">캘린더</label>
        <Calendar id="date" 
          fortmatShortWeekday={true}
          minDate={new Date()}
          maxDate={maxSelectableDate} 
          dateFormat = "yyyy.MM.dd(eee)"
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
          readOnly
          />
      </div>
    </>
  )
}

export default ReservationDate