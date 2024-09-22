import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter
import App from './App';
import BookingPage from './components/BookingPage';


test('renders the logo element', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  
  const logoElement = screen.getByAltText('Company Logo');
  expect(logoElement).toBeInTheDocument();
});


test('Renders the BookingForm heading', () => {
  render(<BookingPage/>);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})

describe('BookingPage Form Test', () => {
  const mockSetFormSubmitted = jest.fn();

  const renderForm = () => {
    return render(
      <BookingPage />
    );
  };

  it('should allow selecting a location and proceed to the next step', () => {
    renderForm();

    // Step 1: Select a location
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation);

    // Verify location is selected
    expect(screen.getByText('Chicago')).toBeInTheDocument()

    // Proceed to the next step
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();

    const intervalId = setInterval(() => {
      if (!nextButton.disabled) {
        clearInterval(intervalId);
        fireEvent.click(nextButton);

        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();

        done(); // Signal that the test is complete
      }
    }, 100); // Check every 100 ms

  });

  it('should allow input for number of guests, date, and time and proceed', () => {
    renderForm();
    // Proceed to the next step
    const nextButton = screen.getByRole('button', { name: /next/i });

    const intervalId = setInterval(() => {
      if (!nextButton.disabled) {
        clearInterval(intervalId);
        fireEvent.click(nextButton);

        // Step 2: Fill in guests, date, and time
        const guestsInput = screen.getByLabelText(/number of guests/i);
        fireEvent.change(guestsInput, { target: { value: '2', name: 'guests' } });
        expect(guestsInput.value).toBe('2');

        const dateInput = screen.getByLabelText(/choose date/i);
        fireEvent.change(dateInput, { target: { value: '2025-09-20', name: 'date' } });
        expect(dateInput.value).toBe('2025-09-20');

        const timeSelect = screen.getByLabelText(/choose time/i);
        fireEvent.change(timeSelect, { target: { value: '18:00', name: 'time' } });
        expect(timeSelect.value).toBe('18:00');

        // Proceed to the next step
        fireEvent.click(nextButton);

        // Step 3 should be rendered
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

        done(); // Signal that the test is complete
      }
    }, 100); // Check every 100 ms
  });

  it('should allow input for name, email, phone, and occasion, then submit the form', () => {
    renderForm();
    // Proceed to the next step
    const nextButton = screen.getByRole('button', { name: /next/i });
    const intervalId = setInterval(() => {
      if (!nextButton.disabled) {
        clearInterval(intervalId);
        fireEvent.click(nextButton);

        // Step 2: Fill in guests, date, and time
        const guestsInput = screen.getByLabelText(/number of guests/i);
        fireEvent.change(guestsInput, { target: { value: '2', name: 'guests' } });
        expect(guestsInput.value).toBe('2');

        const dateInput = screen.getByLabelText(/choose date/i);
        fireEvent.change(dateInput, { target: { value: '2025-09-20', name: 'date' } });
        expect(dateInput.value).toBe('2025-09-20');

        const timeSelect = screen.getByLabelText(/choose time/i);
        fireEvent.change(timeSelect, { target: { value: '18:00', name: 'time' } });
        expect(timeSelect.value).toBe('18:00');

        fireEvent.click(nextButton);


        // Step 3: Fill in name, email, phone, and occasion
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
        expect(nameInput.value).toBe('John Doe');

        const emailInput = screen.getByLabelText(/email/i);
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com', name: 'email' } });
        expect(emailInput.value).toBe('john.doe@example.com');

        const phoneInput = screen.getByLabelText(/phone/i);
        fireEvent.change(phoneInput, { target: { value: '123-456-7890', name: 'phone' } });
        expect(phoneInput.value).toBe('123-456-7890');

        const occasionSelect = screen.getByLabelText(/special occasion/i);
        fireEvent.change(occasionSelect, { target: { value: 'Birthday', name: 'occasion' } });
        expect(occasionSelect.value).toBe('Birthday');

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /reserve table/i });
        fireEvent.click(submitButton);

        // Verify form submission and summary
        expect(screen.getByText(/thank you for your reservation/i)).toBeInTheDocument();
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/birthday/i)).toBeInTheDocument();

        
        done(); // Signal that the test is complete
      }
    }, 100); // Check every 100 ms
  
    
  });
});