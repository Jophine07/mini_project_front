import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [data, setData] = useState({
        admin_name: '',
        admin_password: ''
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    let navigate = useNavigate();

    const readValue = () => {
        axios.post("http://localhost:8080/adminLogin", data)
            .then((response) => {
                if (response.data.status === "login success") {
                    navigate("/bookings");
                } else if (response.data.status === "User Not Found") {
                    alert("Username does not exist");
                } else {
                    alert("Incorrect password");
                }
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <center><b><h3>ADMIN LOGIN</h3></b></center>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-rounded text-bg-light border-info">
                            <div className="card-body">
                                <h4 className="text-center mb-4">Welcome, Admin</h4>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Admin Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="admin_name"
                                            value={data.admin_name}
                                            onChange={inputHandler}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="admin_password"
                                            className="form-control"
                                            value={data.admin_password}
                                            onChange={inputHandler}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn btn-success w-50" onClick={readValue}>
                                            Login
                                        </button>
                                        <div className="mt-3">
                                            <Link to="/">Back to home page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
