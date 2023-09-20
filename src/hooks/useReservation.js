import useReservationStore from '@s/reservation';
import { useCallback, useMemo } from "react";

function useReservation() {
  const reservationData = useReservationStore((state) => state.reservationData);
  const setReservationData = useReservationStore((state) => state.setReservationData);
  
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      
      setReservationData({ [name]: value });
    },
    [setReservationData]
  );

  console.log(reservationData);

  return useMemo(
    () => ({ reservationData, setReservationData, handleInputChange }),
    [reservationData, setReservationData, handleInputChange]
  );
}

export default useReservation