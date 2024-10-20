import React, { useState } from 'react';
import axios from 'axios';
import UserDashBoard from './UserDashBoard';

function App() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [timeSlot, setTimeSlot] = useState('1');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!temperature || temperature < -30 || temperature > 50) {
      setError('Temperature must be between -30°C and 50°C.');
      return false;
    }
    if (!humidity || humidity < 0 || humidity > 100) {
      setError('Humidity must be between 0% and 100%.');
      return false;
    }
    if (!windSpeed || windSpeed < 1 || windSpeed > 100) {
      setError('Wind speed must be between 1 and 100 km/h.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        wind_speed: parseFloat(windSpeed),
        time_slot: parseInt(timeSlot),
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('An error occurred while making the prediction. Please try again.');
    }
  };

  return (
    <div>
      <UserDashBoard/>
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Rainfall Prediction</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Temperature (°C)</label>
          <input
            type="number"
            placeholder="e.g., 25"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Humidity (%)</label>
          <input
            type="number"
            placeholder="e.g., 60"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Wind Speed (km/h)</label>
          <input
            type="number"
            placeholder="e.g., 15"
            value={windSpeed}
            onChange={(e) => setWindSpeed(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Time Slot</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="1">6am-10am</option>
            <option value="2">10am-2pm</option>
            <option value="3">2pm-6pm</option>
            <option value="4">6pm-10pm</option>
            <option value="5">10pm-2am</option>
            <option value="6">2am-6am</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}>Predict</button>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </form>
      {prediction && <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#007bff' }}>Prediction: {prediction}</h2>}
    </div>
    </div>
  );
}

export default App;
