import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashBoard from './AdminDashBoard';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vieworders');
        setOrders(response.data);
      } catch (error) {
        setErrorMessage('Error fetching orders. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <AdminDashBoard />
      <div className="alert alert-primary" role="alert">
        <center><b><h3>Admin: Manage Orders</h3></b></center>
      </div>
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {loading ? ( // Show loading spinner or message
        <div>Loading orders...</div>
      ) : (
        orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user}</td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.itemName} ({item.option}) - Qty: {item.quantity}, Price: ₹{item.price}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default ViewOrders;
