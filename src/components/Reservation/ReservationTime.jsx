import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { setHours, setMinutes } from 'date-fns';

function ReservationTime() {

  const [time, setTime] = useState(
    setHours(setMinutes(new Date(), 0), 9) // 9:00 AM
  );

  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
    
  //   return currentDate.getTime() < selectedDate.getTime();
  // };
  
  return (
    <>
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
    </>
  )
}

export default ReservationTime