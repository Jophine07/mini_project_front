import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here.
    localStorage.removeItem('authToken'); // Example if you're using local storage for tokens.
    
    // Navigate to the login page after logout.
    navigate('/adminlogin');
  };

  return (
    <div>
      <div className="alert alert-primary" role="alert">
        <center><b><h3>ADMIN's CONTROL</h3></b></center>
      </div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Admin DashBoard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/bookings">View Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">Search Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vieworders">Food Orders</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashBoard;
