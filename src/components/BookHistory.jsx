import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(''); // Separate state for storing the user's name

  const navigate = useNavigate();

  // Fetch the logged-in user's name from sessionStorage
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setName(sessionUser); // Store the username in a separate state
    }
  }, [navigate]);

  // Fetch booking history for the logged-in user
  useEffect(() => {
    if (name) {  // Only fetch bookings if the user's name is set
      const fetchBookings = async () => {
        try {
          // Make a POST request to the server with the username in the request body
          const response = await axios.post('http://localhost:8080/bookinghistory', { username: name });
          setBookings(response.data);
          setLoading(false); // Stop loading when the data is fetched
        } catch (error) {
          setErrorMessage('Error retrieving booking history. Please try again.');
          setLoading(false); // Stop loading even if there's an error
        }
      };

      fetchBookings();
    }
  }, [name]);
  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching
  }

  return (
    <div>
      <UserDashBoard />
      <center>
        <h2>Booking History</h2>
      </center>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {bookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Add-Ons</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td> {/* Assuming 'name' is fetched from the database */}
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.date}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.addOns.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;
