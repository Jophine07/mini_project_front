import axios from 'axios';
import React, { useState } from 'react'
import UserDashBoard from './UserDashBoard';

const Prediction = () => {
    const [timeSlot, setTimeSlot] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    // Handle form input changes
    const handleChange = (e) => {
      setTimeSlot(e.target.value);
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const dataToSend = {
        timeSlot: timeSlot,  // Send the selected time slot to the backend
      };
  
      try {
        const response = await axios.post('http://localhost:5000/predictclimate', dataToSend);
        setPrediction(response.data);  // Assuming the API response contains the prediction data
      } catch (error) {
        setErrorMessage('Error predicting climate. Please try again.');
      }
    };
  
    return (
      <div>
                    <UserDashBoard />
        <h2 className="text-center">Predict Climate for a Time Slot</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          {/* Select box for time slots */}
          <div className="form-group mb-3">
            <label htmlFor="timeSlot">Time Slot:</label>
            <select 
              id="timeSlot" 
              name="timeSlot" 
              value={timeSlot} 
              onChange={handleChange} 
              className="form-select" 
              required
            >
              <option value="">Select a time slot</option>
              <option value="06:00-09:00">06:00 - 09:00</option>
              <option value="09:00-12:00">09:00 - 12:00</option>
              <option value="12:00-15:00">12:00 - 15:00</option>
              <option value="15:00-18:00">15:00 - 18:00</option>
              <option value="18:00-21:00">18:00 - 21:00</option>
            </select>
          </div>
  
          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Predict</button>
        </form>
  
        {/* Display the prediction result */}
        {prediction && (
          <div className="mt-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Climate Prediction:</h3>
                <p className="card-text"><strong>Weather:</strong> {prediction.weather}</p>
                <p className="card-text"><strong>Temperature:</strong> {prediction.temperature} °C</p>
                <p className="card-text"><strong>Humidity:</strong> {prediction.humidity}%</p>
                <p className="card-text"><strong>Wind Speed:</strong> {prediction.windSpeed} m/s</p>
              </div>
            </div>
          </div>
        )}
  
        {/* Display error message if there's any */}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>
    );
  };

export default Prediction