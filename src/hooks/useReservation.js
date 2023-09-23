import useReservationStore from "@s/reservation";
import { useCallback, useMemo } from "react";

function useReservation() {
  const reservationData = useReservationStore((state) => state.reservationData);
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const resetReservationData = useReservationStore((state) => state.resetReservationData);
  
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      
      setReservationData({ [name]: value });
    },
    [setReservationData]
  );

  // console.log('예약데이터:',reservationData);

  return useMemo(
    () => ({ reservationData, setReservationData, handleInputChange, resetReservationData }),
    [reservationData, setReservationData, handleInputChange, resetReservationData]
  );
  // return { reservationData, setReservationData, handleInputChange };
}

export default useReservation