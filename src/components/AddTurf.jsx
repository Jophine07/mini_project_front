import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';
import { useNavigate } from 'react-router-dom';

const TurfBooking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    addOns: [],
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setBookingDetails((prev) => ({ ...prev, name: sessionUser }));
    }
  }, [navigate]);

  useEffect(() => {
    if (bookingDetails.date) {
      const fetchBookedSlots = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/bookedslots?date=${bookingDetails.date}`);
          setBookedSlots(response.data);
          console.log(setBookedSlots)
        } catch (error) {
          console.error('Error fetching booked slots:', error);
        }
      };
      fetchBookedSlots();
    }
  }, [bookingDetails.date]);

  const timeSlots = [
    '06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM',
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

    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDate = new Date(bookingDetails.date);
    const today = new Date();
    today.setHours(today.getHours(), today.getMinutes(), 0, 0);

    const [startTime, endTime] = bookingDetails.timeSlot.split(' - ');
    const startBookingTime = new Date(selectedDate);
    startBookingTime.setHours(
      parseInt(startTime.split(':')[0]) + (startTime.includes('PM') ? 12 : 0),
      parseInt(startTime.split(':')[1])
    );

    if (startBookingTime < today) {
      setErrorMessage('The booking date and time cannot be in the past.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/addturf', bookingDetails);
      if (response.status === 200) {
        setSuccessMessage('Turf booking successful!');
        alert('Turf booking successful!');
        navigate('/bookinghistory')
        setBookingDetails({
          name: bookingDetails.name,
          email: '',
          phone: '',
          date: '',
          timeSlot: '',
          addOns: [],
        });
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Error ${error.response.status}: ${error.response.data.message}`);
      } else {
        setErrorMessage('Error booking turf. Please try again.');
      }
    }
  };

  const handleTimeSlotClick = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setBookingDetails({ ...bookingDetails, timeSlot: slot });
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4a4a4a',
  };

  const inputStyle = {
    marginBottom: '15px',
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  };

  const timeSlotButtonStyle = (slot) => {
    if (bookedSlots.includes(slot)) {
      return {
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'not-allowed',
      };
    }
    return {
      backgroundColor: bookingDetails.timeSlot === slot ? '#28a745' : '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    };
  };

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginBottom: '15px',
  };

  const submitButtonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const noteStyle = {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#6c757d',
    marginBottom: '20px',
  };

  return (
    <div>
      <UserDashBoard />
      <div style={formStyle}>
        <h2 style={headerStyle}>Book Your Turf</h2>
        <h4 style={headerStyle}>Welcome, {bookingDetails.name}</h4>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={bookingDetails.name}
              readOnly
              style={inputStyle}
            />
          </div>

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
              style={inputStyle}
            />
          </div>

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
              style={inputStyle}
            />
          </div>

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
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Time Slot</label>
            <div style={buttonGridStyle}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  style={timeSlotButtonStyle(slot)}
                  onClick={() => handleTimeSlotClick(slot)}
                  disabled={bookedSlots.includes(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Add-Ons</label>
            <div style={checkboxStyle}>
              {addOnsList.map((addOn) => (
                <div key={addOn}>
                  <input
                    type="checkbox"
                    id={addOn}
                    name="addOns"
                    value={addOn}
                    checked={bookingDetails.addOns.includes(addOn)}
                    onChange={handleChange}
                  />
                  <label htmlFor={addOn}>{addOn}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" style={submitButtonStyle}>Submit</button>
          <p style={noteStyle}>
            Note: Slots in <span style={{ color: 'red' }}>red</span> are already booked and cannot be selected.
          </p>
        </form>
      </div>
    </div>
  );
};

export default TurfBooking;
