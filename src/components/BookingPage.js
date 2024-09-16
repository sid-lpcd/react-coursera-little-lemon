import BookingForm from "./BookingForm";
import React, { useState, useEffect, useReducer } from "react";
import { timesReducer, updateTimes, initializeTimes } from "./reducer";
function BookingPage() {
  const [booking, setBooking] = useState(
      {name:"", email: "", phone: "", location: "Chicago", date: "", time: "", guests: "1", occasion: ""},
  );

  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const bookingSummary = Object.keys(booking).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
    value: booking[key] || "None" // Handle empty values with a default
  }));

  if (formSubmitted) {
    return (
      <section className="container container-green" id="book-table">
        <h3 className='title-primary col-6'>Thank you for your reservation!</h3>
        <div className="col-6">
          <p className='text-second'>Here is your booking summary:</p>
          <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", listStyle: "none", padding: "0 0 0 10px", margin: "10px 0px" }}>
            {bookingSummary.map((item, index) => (
              <li key={index} className="text-second">
                <strong style={{ color: "#F4CE14" }}>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="container container-green" id="book-table">
        <div className="col-6">
            <h1 className="title-primary">Little Lemon</h1>
            <h3 className="title-secondary">Chicago</h3>
            <p className="text-second">Random description of the restaurant. This text is just place holder to simulate how it would look.
        Fill even more the text so it looks better aligned with Coursera tasks.</p>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <BookingForm 
            booking={booking}
            availableTimes={availableTimes}
            today={today}
            onChange={handleChange}
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
          />
        </div>
      </section>
    </>
  );
}

export default BookingPage;
  