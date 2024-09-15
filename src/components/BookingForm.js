function BookingForm({ booking, availableTimes, today, onChange }) {
    return (
      <>
        <form style={{display: "grid", maxWidth: "200px", gap: "20px"}}>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" name="date" min={today} value={booking.date || today} onChange={onChange} required/>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time " name="time" value={booking.time || ""} onChange={onChange} required>
                {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input type="number" placeholder="1" min="1" max="10" id="guests" name="guests" value={booking.guests || ""} onChange={onChange} required/>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" name="occasion" value={booking.occasion || ""} onChange={onChange}>
                    <option value="">Select an occasion</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
            </select>
            <input type="submit" value="Make Your reservation" className="btn btn-primary"/>
        </form>
      </>
    );
  }
  
  export default BookingForm;
  