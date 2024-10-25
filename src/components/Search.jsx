import axios from 'axios';
import React, { useState } from 'react';
import AdminDashBoard from './AdminDashBoard';

const Search = () => {
    const [bookings, setBookings] = useState([]);
    const [searchDate, setSearchDate] = useState({
        date: ""
    });
    const [isSearched, setIsSearched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const handleDateChange = (event) => {
        setSearchDate({ ...searchDate, [event.target.name]: event.target.value });
    };

    const handleSearch = () => {
        axios.post("http://localhost:8080/search", searchDate).then(
            (response) => {
                setBookings(response.data); // assuming the response contains bookings
                setIsSearched(true); // Indicate that a search has been performed
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    };

    const deleteBooking = async (name) => {
        try {
          const input = { name };
          const response = await axios.post('http://localhost:8080/delete', input);
    
          if (response.data.status === 'success') {
            setSuccessMessage('Booking deleted successfully.');
            // Update state to remove the deleted booking
            setBookings(bookings.filter((booking) => booking.name !== name));
          } else {
            setErrorMessage('Error in deleting booking.');
          }
        } catch (error) {
          setErrorMessage('Error deleting booking. Please try again.');
        }
    
        // Clear messages after 3 seconds
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
            
            <div className="input-group mb-3"> 
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={searchDate.date}
                    onChange={handleDateChange}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={!searchDate.date}
                    >
                        Search by Date
                    </button>
                </div>
            </div>

            <div className="table-responsive">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {isSearched && bookings.length === 0 ? (
                    <div className="text-center mt-4">
                        <p>No bookings available for the selected date.</p>
                    </div>
                ) : (
                    <table className="table table-bordered mt-4">
                        <thead className="thead-dark">
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
                                <tr key={booking._id}>
                                    <td>{booking.name}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.timeSlot}</td>
                                    <td>{booking.addOns.join(', ')}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            Uncomment and replace with the actual function for deletion
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
        </div>
    );
};

export default Search;
