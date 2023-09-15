import DatePicker from 'react-datepicker';
import { useState } from 'react';

function Time() {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <DatePicker
    selected={selectedTime}
    onChange={(date) => setSelectedTime(date)}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={30}
    timeCaption="Time"
    dateFormat="h:mm aa"
  />
  )
}

export default Time