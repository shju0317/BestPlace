import useReservationStore from '@s/reservation';

function useReservation() {
  const { reservationData, setReservationData } = useReservationStore();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('name은', name);
    console.log('value는', value);
    
    setReservationData({ [name]: value });
    console.log(reservationData);
  };

  return {reservationData, setReservationData, handleInputChange};
}

export default useReservation