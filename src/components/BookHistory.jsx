import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  // Fetch the logged-in user's name from sessionStorage
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setName(sessionUser);
    }
  }, [navigate]);

  // Fetch all bookings for the logged-in user
  useEffect(() => {
    if (name) {
      const fetchAllBookings = async () => {
        try {
          const response = await axios.post('http://localhost:8080/bookinghistory', { username: name });
          setAllBookings(response.data); // Set all bookings for the user
        } catch (error) {
          setErrorMessage('Error retrieving booking history. Please try again.');
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      fetchAllBookings();
    }
  }, [name]);

  // Function to handle cancellation
  const handleCancel = async (bookingId) => {
    try {
      const input = { bookingId };
      const response = await axios.post('http://localhost:8080/cancelbooking', input);
      if (response.data.status === 'success') {
        alert('Cancellation request sent successfully!');
        // Optionally, refresh the booking history if needed
      } else {
        alert('Error sending cancellation request. Please try again.');
      }
    } catch (error) {
      alert('Error sending cancellation request. Please try again.');
    }
  };

  
  const isFutureBooking = (bookingDate) => {
    const currentDate = new Date();
    const bookingDateObj = new Date(bookingDate);
    return bookingDateObj > currentDate;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserDashBoard />
      <center>
        <h2>All Booking History</h2>
      </center>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {allBookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <table className="table table-bordered table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Add-Ons</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.date}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.addOns.join(', ')}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(booking._id)}
                    disabled={!isFutureBooking(booking.date)} 
                  >
                    Request Cancellation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;
