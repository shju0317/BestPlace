import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Date() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
      <DatePicker 
        showIcon
        selected={selectedDate} 
        onChange={handleDateChange} 
        isClearable
        placeholderText="날짜를 선택하세요."
        />
  );
}

export default Date