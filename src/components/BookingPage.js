import BookingForm from "./BookingForm";
import React, { useState, useEffect, useReducer } from "react";
import { timesReducer, updateTimes, initializeTimes } from "./reducer";
function BookingPage() {
  const [booking, setBooking] = useState([
      {date: "", time: "", guests: "", occasion: ""},
  ]);

  const [today, setToday] = useState('');

  const [availableTimes, dispatch] = useReducer(timesReducer, [], () => initializeTimes());

  useEffect(()=>{// Get today's date in YYYY-MM-DD format
      // Get today's date in YYYY-MM-DD format
      const todayDate = new Date().toISOString().split('T')[0];
      setToday(todayDate);
      setBooking(prevBooking => ({
        ...prevBooking,
        date: todayDate
    }));
  },[])

  function handleChange(e) {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });

    if (name === 'date') {
        dispatch(updateTimes(value)); // Update available times based on the selected date
    }
  }
    return (
      <>
        <BookingForm 
          booking={booking}
          availableTimes={availableTimes}
          today={today}
          onChange={handleChange}
        />
      </>
    );
  }
  
  export default BookingPage;
  