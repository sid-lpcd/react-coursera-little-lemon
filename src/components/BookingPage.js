import BookingForm from "./BookingForm";
import React, { useState, useEffect, useReducer } from "react";
import { timesReducer, updateTimes, initializeTimes } from "./reducer";


function BookingPage() {
  const [booking, setBooking] = useState(
      {name:"", email: "", phone: "", location: "Chicago", date: "", time: "", guests: "1", occasion: ""},
  );

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [today, setToday] = useState('');
  const [errors, setErrors] = useState({});  // Track errors for each field
  const [apiReady, setApiReady] = useState(false); // Track API readiness

  const [availableTimes, dispatch] = useReducer(timesReducer, [], () => initializeTimes());

  useEffect(()=>{// Get today's date in YYYY-MM-DD format
      // Get today's date in YYYY-MM-DD format
      const todayDate = new Date().toISOString().split('T')[0];
      setToday(todayDate);
      setBooking(prevBooking => ({
        ...prevBooking,
        date: todayDate
    }));
    
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/api/api.js`;
    script.async = true;
    script.onload = () => {
      setApiReady(true); // Set API as ready once the script loads
      window.apiReady = true; // Set global state for tests
      if (window.fetchAPI) {
        // You can now access fetchAPI or submitAPI
        const initialTimes = window.fetchAPI(todayDate);  // Use the API
        dispatch(updateTimes(initialTimes));

      } 
    };

    script.onerror = () => {
      console.error("Error loading external script");
    };
  
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);  // Clean up the script when the component unmounts
    };
  },[])

  useEffect(() => {
    if (booking.date && apiReady) {
      // Whenever the date changes, fetch available times for that date
      const updatedTimes = window.fetchAPI(booking.date);
      dispatch(updateTimes(updatedTimes));
    }
  }, [apiReady, booking.date]); // Runs whenever the 'booking.date' changes

  function handleChange(e) {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });

    if (name === 'date' && apiReady) {
        dispatch(updateTimes(window.fetchAPI(value))); // Update available times based on the selected date
    }
  }

  const bookingSummary = Object.keys(booking).map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
    value: booking[key] || "None" // Handle empty values with a default
  }));

  const submitForm = async (formData) => {
    try {
      if(apiReady){
          const isSuccess = await window.submitAPI(formData); // Wait for the external submitAPI
        if (isSuccess) {
            console.log("Form successfully submitted!");
            setFormSubmitted(true); // Indicate that the form has been submitted
        } else {
            console.error("Form submission failed.");
        }
      } else{
        console.error("API not ready for submission.");
      }
      
    } catch (error) {
      console.error("An error occurred during submission:", error);
    }
  };

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
      <section className={errors ? 'container container-green errors' : 'container container-green'} id="book-table">
        <div className="col-6">
            <h1 className="title-primary">Little Lemon</h1>
            <h3 className="title-secondary">Book Now</h3>
            <p className="text-second">Random description of the restaurant. This text is just place holder to simulate how it would look.
        Fill even more the text so it looks better aligned with Coursera tasks.</p>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <BookingForm 
            booking={booking}
            availableTimes={availableTimes}
            today={today}
            onChange={handleChange}
            submitForm={submitForm}
            errors={errors}
            setErrors={setErrors}
            apiReady={apiReady}
          />
        </div>
      </section>
    </>
  );
}

export default BookingPage;
  