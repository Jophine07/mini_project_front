import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDashBoard from './UserDashBoard';

const OrderFood = () => {
  const availableItems = [
    { name: 'Shawarma', options: ['Half', 'Full'], price: { Half: 80, Full: 150 } },
    { name: 'Alfam', options: ['Half', 'Full'], price: { Half: 120, Full: 200 } },
    { name: 'Juice', options: ['Lime', 'Orange'], price: { Lime: 30, Orange: 40 } },
    { name: 'Water Bottle', options: ['500ml', '1L'], price: { '500ml': 10, '1L': 20 } },
    { name: 'Pizza', options: ['Small', 'Medium', 'Large'], price: { Small: 150, Medium: 250, Large: 400 } },
    { name: 'Burger', options: ['Veg', 'Chicken'], price: { Veg: 50, Chicken: 80 } },
    { name: 'Pasta', options: ['Red Sauce', 'White Sauce'], price: { 'Red Sauce': 120, 'White Sauce': 130 } },
    { name: 'Ice Cream', options: ['Vanilla', 'Chocolate', 'Strawberry'], price: { Vanilla: 60, Chocolate: 70, Strawberry: 65 } },
  ];

  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user_name');
    if (!sessionUser) {
      navigate("/userlogin");
    } else {
      setName(sessionUser);
    }
  }, [navigate]);

  const handleSelectItem = (itemName, option, quantity) => {
    const selectedItem = availableItems.find(item => item.name === itemName);
    const pricePerItem = selectedItem.price[option];

    setOrderItems(prevState => {
      const updatedItems = {
        ...prevState,
        [itemName]: { option, quantity, price: pricePerItem * quantity }
      };
      return updatedItems;
    });
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [orderItems]);

  const calculateTotalPrice = () => {
    const total = Object.values(orderItems).reduce((sum, item) => {
      return sum + (item.price || 0);
    }, 0);
    setTotalPrice(total);
  };

  const handlePlaceOrder = async () => {
    const orderedItems = Object.entries(orderItems).map(([itemName, { option, quantity, price }]) => ({
      itemName,
      option,
      quantity: parseInt(quantity, 10),
      price
    }));

    const orderData = {
      user: name,
      items: orderedItems,
      totalPrice
    };

    try {
      const response = await axios.post('http://localhost:8080/api/orders/create-order', orderData);
      setSuccessMessage('Order placed successfully!');
      alert('Order placed successfully!')
      setOrderItems({});
      setTotalPrice(0);
      navigate('/OrderHistory')
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('Failed to place the order. Please try again.');
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#343a40',
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const alertStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const errorStyle = {
    ...alertStyle,
    backgroundColor: '#f8d7da',
    color: '#721c24',
  };

  const successStyle = {
    ...alertStyle,
    backgroundColor: '#d4edda',
    color: '#155724',
  };

  return (
    <div>
      <UserDashBoard />
      <div style={formStyle}>
        <h2 style={headerStyle}>Order Food Refreshments</h2>
        <p className="alert alert-warning">Food orders are made on the date of visiting, and no cancellations are available.</p>
        {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
        {successMessage && <div style={successStyle}>{successMessage}</div>}

        <form>
          <h5>Select Items:</h5>
          {availableItems.map((item, index) => (
            <div key={index}>
              <label className="form-label">{item.name}</label>
              <div style={inputGroupStyle}>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    handleSelectItem(item.name, selectedOption, orderItems[item.name]?.quantity || 1);
                  }}
                  value={orderItems[item.name]?.option || ''}
                  style={{ flex: 2 }}
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
                  style={{ flex: 1 }}
                >
                  <option value="">Quantity</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="mt-3">
            <h5>Total Price: ₹{totalPrice}</h5>
          </div>

          <button
            type="button"
            style={buttonStyle}
            onClick={handlePlaceOrder}
            disabled={Object.keys(orderItems).length === 0}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFood;
