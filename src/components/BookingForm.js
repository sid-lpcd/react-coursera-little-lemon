import React, { useState } from 'react';

function BookingForm({ booking, availableTimes, today, onChange, formSubmitted, setFormSubmitted }) {
  const locations = ["Chicago", "New York", "Los Angeles"];

  const [currentStep, setCurrentStep] = useState(1);

  // Handle going to the next step or form submission
  const handleNextStep = (event) => {
    event.preventDefault(); // Prevent form submission on "Next"
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Go to the next step
    } else {
      // Submit the form on the final step
      console.log("Form submitted:", booking);
      
      // You can handle the actual form submission logic here (e.g., sending data to an API)
      setFormSubmitted(true);
    }
  };
  return (
    <>
      <form style={{display: "grid", gap: "20px"}}>
      {currentStep === 1 && (
        <div className="first d-flex flex-column">
          <label htmlFor="location" className='fs-4 text-second mb-2'>Where would you like to eat?</label>
          <div className="location-options">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`location-box ${booking.location === location ? 'selected' : ''}`}
                onClick={() => onChange({target:{name: 'location', value: location}})}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="second d-flex flex-column gy-5">
          <label htmlFor="guests" className='fs-4 text-second mb-2'>Number of guests</label>
          <input type="number" placeholder="1" min="1" max="10" id="guests" name="guests" value={booking.guests || ""} onChange={onChange} required/>
          <label htmlFor="res-date" className='fs-4 text-second mb-2'>Choose date</label>
          <input type="date" id="res-date" name="date" min={today} value={booking.date || today} onChange={onChange} required/>
          <label htmlFor="res-time" className='fs-4 text-second mb-2'>Choose time</label>
          <select id="res-time " name="time" value={booking.time || ""} onChange={onChange} required>
              {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                      {time}
                  </option>
              ))}
          </select>
        </div>
      )}
      {currentStep === 3 && (
        <div className="third d-flex flex-column">
          <label htmlFor="name" className='fs-5 text-second mb-2'>Name</label>
          <input type="text" id="name" name="name" value={booking.name || ""} onChange={onChange} required/>
          <label htmlFor="email" className='fs-5 text-second mb-2'>Email</label>
          <input type="email" id="email" name="email" value={booking.email || ""} onChange={onChange} required/>
          <label htmlFor="phone" className='fs-5 text-second mb-2'>Phone</label>
          <input type="tel" id="phone" name="phone" value={booking.phone || ""} onChange={onChange} required/>
          <label htmlFor="occasion" className='fs-5 text-second mb-2'>Special occasion?</label>
          <select id="occasion" name="occasion" value={booking.occasion || ""} onChange={onChange}>
                  <option value="">Select an occasion</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
          </select>
        </div>
      )}
        <input
          type="submit"
          value={currentStep === 3 ? "Reserve Table" : "Next"}
          className="btn btn-primary"
          onClick={handleNextStep}
        />
      </form>
    </>
  );
}

export default BookingForm;
  