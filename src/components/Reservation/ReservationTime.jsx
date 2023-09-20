import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import useReservation from '@h/useReservation';

function ReservationTime() {
  const {reservationData, setReservationData} = useReservation();
  const [selectedTime, setSelectedTime] = useState(
    setHours(setMinutes(new Date(), 0), 9) // 9:00 AM
  );

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const formattedTime = format(new Date(time), 'HH:mm:ss');
    console.log('오', formattedTime)

    setReservationData(prevData => ({
      ...prevData,"date":formattedTime
    }));
    // setReservationData({ "date": formattedTime });
    // reservationData.append("date", formattedTime);
  };


  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
    
  //   return currentDate.getTime() < selectedDate.getTime();
  // };
  // useEffect(() => {
  //   setReservationData({ "guestCount": selectedTime });
  //   },[selectedTime]
  // )
  
  return (
    <>
      <div className="flex flex-row gap-4 border-b p-4 items-center">
        <label htmlFor="time" className="text-lg font-semibold">시간</label>
        <DatePicker
          id="time"
          selected={selectedTime}
          onChange={handleTimeClick}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          minTime={new Date().setHours(9, 0)} //오전 9시
          maxTime={new Date().setHours(20, 0)} // 오후 8시
          dateFormat="h:mm aa"
          // filterTime={filterPassedTime}  
          className="rounded border border-primary px-4 py-2"
        />
        <select>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
    </>
  )
}

export default ReservationTime