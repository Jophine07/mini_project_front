import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
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

  // Fetch all order history for the logged-in user
  useEffect(() => {
    if (name) {
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.post('http://localhost:8080/orderhistory', { username: name });
          setOrderHistory(response.data); // Set order history for the user
        } catch (error) {
          setErrorMessage('Error retrieving order history. Please try again.');
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      fetchOrderHistory();
    }
  }, [name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserDashBoard />
      <center>
        <h2>Your Order History</h2>
      </center>
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      {orderHistory.length === 0 ? (
        <p>No orders found for this user.</p>
      ) : (
        <>
          <p className="alert alert-warning">Food orders are made on the date of visiting, and no cancellations are available.</p>
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Status</th> {/* New column for displaying the order status */}
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.itemName} ({item.option}) - Quantity: {item.quantity}, Price: ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.status}</td> {/* Display the status of the order */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
