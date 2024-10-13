import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDashBoard from './UserDashBoard';

const OrderFood = () => {
  const availableItems = [
    { name: 'Shawarma', options: ['Half', 'Full'], price: { Half: 80, Full: 150 } },
    { name: 'Alfam', options: ['Half', 'Full'], price: { Half: 120, Full: 200 } },
    { name: 'Juice', options: ['Lime', 'Orange'], price: { Lime: 30, Orange: 40 } },
    { name: 'Water Bottle', options: ['500ml', '1L'], price: { '500ml': 10, '1L': 20 } }
  ];
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState(''); // Separate state for storing the user's name

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setName(sessionUser); // Store the username in a separate state
    }
  }, [navigate]);

  // Handle selecting an item, option, and quantity
  const handleSelectItem = (itemName, option, quantity) => {
    const selectedItem = availableItems.find(item => item.name === itemName);
    const pricePerItem = selectedItem.price[option];

    setOrderItems(prevState => ({
      ...prevState,
      [itemName]: { option, quantity, price: pricePerItem * quantity }
    }));

    calculateTotalPrice();
  };

  // Calculate the total price of the order
  const calculateTotalPrice = () => {
    const total = Object.values(orderItems).reduce((sum, item) => {
      return sum + (item.price || 0);
    }, 0);
    setTotalPrice(total);
  };

  // Handle placing the order
  const handlePlaceOrder = async () => {
    const orderedItems = Object.entries(orderItems).map(([itemName, { option, quantity, price }]) => ({
      itemName,
      option,
      quantity: parseInt(quantity, 10),
      price
    }));

    const orderData = {
      user: name, // Replace with actual logged-in user data
      items: orderedItems,
      totalPrice
      
    };

    try {
      // Make the API call to save the order
      const response = await axios.post('http://localhost:8080/api/orders/create-order', orderData);
      setSuccessMessage('Order placed successfully!');
      alert(totalPrice)
      setOrderItems({});
      setTotalPrice(0); // Reset total price after successful order
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('Failed to place the order. Please try again.');
    }
  };

  return (
    <div>
      <UserDashBoard/>
      <center><h2>Order Food Refreshments</h2></center>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form className="p-4 border rounded shadow-sm bg-light">
        <h5>Select Items:</h5>
        {availableItems.map((item, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">{item.name}</label>
            <div className="input-group">
              <select
                className="form-select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  handleSelectItem(item.name, selectedOption, orderItems[item.name]?.quantity || 1);
                }}
                value={orderItems[item.name]?.option || ''}
              >
                <option value="">Select type</option>
                {item.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option} - ₹{item.price[option]}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                onChange={(e) => {
                  const quantity = e.target.value;
                  handleSelectItem(item.name, orderItems[item.name]?.option || item.options[0], quantity);
                }}
                value={orderItems[item.name]?.quantity || ''}
              >
                <option value="">Select quantity</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className="mt-3">
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handlePlaceOrder}
          disabled={Object.keys(orderItems).length === 0}
        >
          Place Order
        </button>

      </form>
    </div>
  );
};

export default OrderFood;
