import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('token'); // Remove token if stored
    navigate("/userlogin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand"><b>UserDashBoard</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addturf">Book Turf</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/bookinghistory">History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Prediction">Prediction</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/orderfood">OrderFood</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orderhistory">Order History</Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserDashBoard;
