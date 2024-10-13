import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignUp = () => {
    const [data, setData] = useState({
        user_name: '',
        user_password: '',
        confirm_user_password: ''
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        if (data.user_password !== data.confirm_user_password) {
            alert("Passwords do not match");
        } else {
            axios.post("http://localhost:8080/userSignUp", data)
                .then((response) => {
                    if (response.data.status === "Saved") {
                        alert("Sign Up Successfully");
                        setData({ user_name: '', user_password: '', confirm_user_password: '' });
                    } else {
                        alert("Sign Up Failed");
                    }
                })
                .catch((error) => {
                    alert(`Error: ${error.message}`);
                });
        }
    };

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <center>
                    <b>
                        <h3>New User Sign Up</h3>
                    </b>
                </center>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg border-rounded text-bg-light border-info">
                            <div className="card-body">
                                <h4 className="text-center mb-4">Create an Account</h4>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="user_name"
                                            value={data.user_name}
                                            onChange={inputHandler}
                                            placeholder="Enter your username"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="user_password"
                                            value={data.user_password}
                                            onChange={inputHandler}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_user_password"
                                            value={data.confirm_user_password}
                                            onChange={inputHandler}
                                            placeholder="Re-enter your password"
                                        />
                                    </div>
                                    <div className="col-12 text-center">
                                        <button className="btn btn-success w-50" onClick={readValue}>
                                            Sign Up
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

export default UserSignUp;
