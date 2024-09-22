import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter
import React, { useState } from 'react';
import App from './App';
import BookingPage from './components/BookingPage';
import BookingForm from './components/BookingForm';


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

describe('BookingForm Input Fields Attribute Tests', () => {
  // Mock initial state for booking
  const mockBooking = {
    location: '',
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    occasion: ''
  };

  // Mock setBooking state handler
  const BookingComponentWithMockOnChange = () => {
    const [booking, setBooking] = useState(mockBooking);

    // Mock onChange function that updates booking state
    const onChange = (e) => {
      const { name, value } = e.target;
      setBooking((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <BookingForm
        booking={booking}
        onChange={onChange}  // Pass the mock onChange function
        availableTimes={['12:00', '14:00']}
        today="2024-09-22"
        submitForm={jest.fn()}
        errors={{}}
        setErrors={jest.fn()}
        apiReady={true}
      />
    );
  };

  it('should render guests input field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step
    
    // Step 2 should be rendered with guests input field
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    expect(guestsInput).toBeInTheDocument();
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toBeRequired();
  });

  it('should render date input field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step

    // Step 2 should be rendered with date input field
    const dateInput = screen.getByLabelText(/choose date/i);
    
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('min', mockProps.today);
    expect(dateInput).toBeRequired();
  });

  it('should render time select field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step

    // Step 2 should be rendered with time select field
    const timeSelect = screen.getByLabelText(/choose time/i);
    
    expect(timeSelect).toBeInTheDocument();
    expect(timeSelect).toHaveAttribute('name', 'time');
    expect(timeSelect).toBeRequired();
  });

  it('should render name input field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '2', name: 'guests' } });

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2025-09-20', name: 'date' } });

    const timeSelect = screen.getByLabelText(/choose time/i);
    // Find all option elements and get the value of the last option
    const options = screen.getAllByRole('option');
    const lastOptionValue = options[options.length - 1].value;

    // Simulate selecting the last option
    fireEvent.change(timeSelect, { target: { value: lastOptionValue, name: 'time' } });
    
    fireEvent.click(nextButton);

    // Step 3 should be rendered with name input field
    const nameInput = screen.getByLabelText(/name/i);
    
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toBeRequired();
  });

  it('should render email input field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '2', name: 'guests' } });

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2025-09-20', name: 'date' } });

    const timeSelect = screen.getByLabelText(/choose time/i);
    // Find all option elements and get the value of the last option
    const options = screen.getAllByRole('option');
    const lastOptionValue = options[options.length - 1].value;

    // Simulate selecting the last option
    fireEvent.change(timeSelect, { target: { value: lastOptionValue, name: 'time' } });
    
    fireEvent.click(nextButton);

    // Step 3 should be rendered with email input field
    const emailInput = screen.getByLabelText(/email/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toBeRequired();
  });

  it('should render phone input field with correct attributes', () => {
    // Render the component with mock state and onChange function
    render(<BookingComponentWithMockOnChange />);

    // Step 1: Select a location first
    const chicagoLocation = screen.getByText('Chicago');
    fireEvent.click(chicagoLocation); // Simulate selecting a location

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);  // Proceed to the next step

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: '2', name: 'guests' } });

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2025-09-20', name: 'date' } });

    const timeSelect = screen.getByLabelText(/choose time/i);
    // Find all option elements and get the value of the last option
    const options = screen.getAllByRole('option');
    const lastOptionValue = options[options.length - 1].value;

    // Simulate selecting the last option
    fireEvent.change(timeSelect, { target: { value: lastOptionValue, name: 'time' } });
    
    fireEvent.click(nextButton);

    // Step 3 should be rendered with phone input field
    const phoneInput = screen.getByLabelText(/phone/i);
    
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(phoneInput).toBeRequired();
  });

  const mockProps = {
    booking: { location: 'Chicago', guests: '', date: '', time: '', name: '', email: '', phone: '', occasion: '' },
    availableTimes: ['18:00', '19:00'],
    today: '2024-09-22',
    onChange: jest.fn(),
    submitForm: jest.fn(),
    errors: {},
    setErrors: jest.fn(),
    apiReady: true, // Ensure the button is enabled for testing purposes
  };

  it('should render submit button with correct disabled state based on apiReady', () => {
    render(<BookingForm {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /next/i });
    
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).not.toBeDisabled();  // `apiReady` is set to true
  });

  it('should disable the submit button if apiReady is false', () => {
    render(<BookingForm {...mockProps} apiReady={false} />);
    
    const submitButton = screen.getByRole('button', { name: /next/i });
    
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();  // Button should be disabled when `apiReady` is false
  });
});