import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';
import { useNavigate } from 'react-router-dom';

const TurfBooking = () => {
  // State to manage booking form inputs
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    addOns: [],
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Check for session when the component mounts
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setBookingDetails((prev) => ({ ...prev, name: sessionUser }));
    }
  }, [navigate]);

  const timeSlots = [
    '06:00 AM - 07:00 AM',
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
    '08:00 PM - 09:00 PM',
    '09:00 PM - 10:00 PM',
  ];

  const addOnsList = ['Boots', 'ScoreBoard', 'Jersey'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setBookingDetails((prevDetails) => {
        const updatedAddOns = checked
          ? [...prevDetails.addOns, value]
          : prevDetails.addOns.filter((addOn) => addOn !== value);
        return { ...prevDetails, addOns: updatedAddOns };
      });
    } else {
      setBookingDetails({ ...bookingDetails, [name]: value });
    }

    // Reset messages when user changes the form
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(bookingDetails.date);
    const today = new Date();
    
    // Set time of today to the start of the day (midnight)
    today.setHours(today.getHours(), today.getMinutes(), 0, 0);

    // Get the time slot from booking details
    const [startTime, endTime] = bookingDetails.timeSlot.split(' - ');

    // Combine date and time for comparison
    const startBookingTime = new Date(selectedDate);

    // Set the booking start time
    startBookingTime.setHours(
      parseInt(startTime.split(':')[0]) + (startTime.includes('PM') ? 12 : 0), 
      parseInt(startTime.split(':')[1])
    );

    // Compare selected booking time with current time
    if (startBookingTime < today) {
      setErrorMessage('The booking date and time cannot be in the past.');
      return;
    }

    try {
      // Send the name along with the other booking details
      const response = await axios.post('http://localhost:8080/addturf', bookingDetails);
      if (response.status === 200) {
        setSuccessMessage('Turf booking successful!');
        setBookingDetails({
          name: bookingDetails.name,  // Keep name intact for future bookings
          email: '',
          phone: '',
          date: '',
          timeSlot: '',
          addOns: [],
        });
        setErrorMessage(''); // Clear any previous error message
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error ${error.response.status}: ${error.response.data.message}`);
      } else {
        setErrorMessage('Error booking turf. Please try again.');
      }
    }
  };

  return (
    <div>
      <UserDashBoard />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <center><h2>Book Your Turf</h2></center>
          <h2>Welcome, {bookingDetails.name}</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="p-4 border rounded">
            {/* Full Name (Read-Only) */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={bookingDetails.name}
                readOnly // Make the name field read-only
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={bookingDetails.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Booking Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={bookingDetails.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time Slot */}
            <div className="mb-3">
              <label htmlFor="timeSlot" className="form-label">Time Slot</label>
              <select
                className="form-select"
                id="timeSlot"
                name="timeSlot"
                value={bookingDetails.timeSlot}
                onChange={handleChange}
                required
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Add-ons */}
            <div className="mb-3">
              <label className="form-label">Add-ons</label>
              {addOnsList.map((addOn, index) => (
                <div key={index} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`addOn-${index}`}
                    name="addOns"
                    value={addOn}
                    checked={bookingDetails.addOns.includes(addOn)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`addOn-${index}`}>
                    {addOn}
                  </label>
                </div>
              ))}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">Book Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TurfBooking;
