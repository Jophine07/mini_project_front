import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashBoard from './AdminDashBoard';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all orders when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vieworders');
        setOrders(response.data);
      } catch (error) {
        setErrorMessage('Error fetching orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/updateorderstatus/${orderId}`, {
        status: newStatus,
      });
      // Update the order list after successful update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      setErrorMessage('Error updating order status. Please try again.');
    }
  };

// Function to delete an order
const deleteOrder = async (orderId) => {
  try {
    // Sending a POST request with the orderId in the request body
    await axios.post('http://localhost:8080/deleteorder', { orderId });

    // Update the orders state to remove the deleted order
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

    // Optionally, you can add a success message or notification here
    alert('Order deleted successfully!');
  } catch (error) {
    console.error('Error deleting order:', error);
    setErrorMessage('Error deleting order. Please try again.');
  }
};


  return (
    <div>
      <AdminDashBoard />
      <div className="alert alert-primary" role="alert">
        <center><b><h3>Admin: Manage Orders</h3></b></center>
      </div>
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {loading ? (
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
                <th>Status</th>
                <th>Action</th> {/* New column for Admin Actions */}
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
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => updateOrderStatus(order._id, 'Ready')}
                    >
                      Ready
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateOrderStatus(order._id, 'Delivered')}
                      style={{ marginLeft: '10px' }}
                    >
                      Delivered
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteOrder(order._id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </button>
                  </td>
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
