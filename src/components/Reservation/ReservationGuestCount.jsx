import { useState, useEffect } from 'react';
import useReservation from '@h/useReservation';

function ReservationGuestCount() {
  const {handleInputChange, reservationData, setReservationData} = useReservation();
  const [guestCount, setGuestCount] = useState(1);

  const handleGuestCountChange = (e) => {
    const count = +e.target.value;
    setGuestCount(count);
    
  };  

  useEffect(() => {
    console.log(guestCount);
    },[guestCount]
  )

  return (
    <>
      <div className="flex flex-row gap-4 border-b p-4 items-center">
        <label htmlFor="guestCount" className="text-lg font-semibold">인원</label>
        <input type="number" min="1" max="10" id="guestCount"
          inputMode="numeric"
          onChange={(e)=>{
            handleGuestCountChange(e);
            handleInputChange(e);
          }}
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
    </>
  )
}

export default ReservationGuestCount