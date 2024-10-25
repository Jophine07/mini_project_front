import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminDashBoard from './AdminDashBoard';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bookings');
        setBookings(response.data);
      } catch (error) {
        setErrorMessage('Error fetching bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (name) => {
    try {
      const input = { name };
      const response = await axios.post('http://localhost:8080/delete', input);

      if (response.data.status === 'success') {
        setSuccessMessage('Booking deleted successfully.');
        
        setBookings(bookings.filter((booking) => booking.name !== name));
      } else {
        setErrorMessage('Error in deleting booking.');
      }
    } catch (error) {
      setErrorMessage('Error deleting booking. Please try again.');
    }

    
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <AdminDashBoard />
      <div className="alert alert-primary" role="alert">
        <center><b><h3>Admin: Manage Bookings</h3></b></center>
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Add-Ons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id || booking.name}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.date}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.addOns ? booking.addOns.join(', ') : 'None'}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBooking(booking.name)}
                  >
                    Delete
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

export default Bookings;
