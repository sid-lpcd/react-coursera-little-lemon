import React, { useState } from 'react';

function BookingForm({ booking, availableTimes, today, onChange, submitForm, errors, setErrors, apiReady}) {
  const locations = ["Chicago", "New York", "Los Angeles"];

  const [currentStep, setCurrentStep] = useState(1);

  // Handle going to the next step or form submission
  const handleNextStep = (event) => {
    event.preventDefault(); // Prevent form submission on "Next"

    let newErrors = {};

    switch (currentStep) {
      case 1:
        // Step 1: Check location
        if (!booking.location) {
          newErrors.location = "Please select a location.";
        }
        break;
      case 2:
        // Step 2: Check date, guests, and time
        if (!booking.date) {
          newErrors.date = "Please select a date.";
        }
        if (!booking.time) {
          newErrors.time = "Please select a time.";
        }
        if (!booking.guests) {
          newErrors.guests = "Please specify the number of guests.";
        }
        break;
      case 3:
        // Step 3: Check name, email, phone
        if (!booking.name) {
          newErrors.name = "Please enter your name.";
        }
        if (!booking.email) {
          newErrors.email = "Please enter your email.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(booking.email)) {
          newErrors.email = "Please enter a valid email address.";
        }
        if (!booking.phone) {
          newErrors.phone = "Please enter your phone number.";
        }
        break;
      default:
        break;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update state with errors
      return;  // Stop progression if there are errors
    } else {
      setErrors({});  // Clear errors if there are none
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Go to the next step
    } else {
      // Submit the form on the final step
      console.log("Form submitted:", booking);
      submitForm()
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
                aria-label="Select location"
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
          <input type="number" placeholder="1" min="1" max="10" id="guests" name="guests" value={booking.guests || ""} onChange={onChange} style={{ borderColor: errors.guests ? 'red' : '' }} required aria-label="Number of guests"/>
          {errors.guests && <p style={{ color: 'red' }}>{errors.guests}</p>}
          <label htmlFor="res-date" className='fs-4 text-second mb-2'>Choose date</label>
          <input type="date" id="res-date" name="date" min={today} value={booking.date || today} onChange={onChange} style={{ borderColor: errors.date ? 'red' : '' }} required aria-label="Choose reservation date"/>
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
          <label htmlFor="res-time" className='fs-4 text-second mb-2'>Choose time</label>
          <select id="res-time" name="time" value={booking.time || ""} onChange={onChange} style={{ borderColor: errors.time ? 'red' : '' }} required aria-label="Choose reservation time"> 
            <option value="" disabled>
              Select a time
            </option>
              {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                      {time}
                  </option>
              ))}
          </select>
          {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}
        </div>
      )}
      {currentStep === 3 && (
        <div className="third d-flex flex-column">
          <label htmlFor="name" className='fs-5 text-second mb-2'>Name</label>
          <input type="text" id="name" name="name" value={booking.name || ""} onChange={onChange} style={{ borderColor: errors.name ? 'red' : '' }} required aria-label="Booking name"/>
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <label htmlFor="email" className='fs-5 text-second mb-2'>Email</label>
          <input type="email" id="email" name="email" value={booking.email || ""} onChange={onChange} style={{ borderColor: errors.email ? 'red' : '' }} required aria-label="Email address"/>
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          <label htmlFor="phone" className='fs-5 text-second mb-2'>Phone</label>
          <input type="tel" id="phone" name="phone" value={booking.phone || ""} onChange={onChange} style={{ borderColor: errors.phone ? 'red' : '' }} required aria-label="Phone number"/>
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
          <label htmlFor="occasion" className='fs-5 text-second mb-2'>Special occasion?</label>
          <select id="occasion" name="occasion" value={booking.occasion || ""} onChange={onChange} aria-label="Select a special occasion">
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
          disabled={!apiReady}
          aria-label="On Click"
        />
      </form>
    </>
  );
}

export default BookingForm;
  