import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignUp = () => {
    const [data, setData] = useState({
        user_name: '',
        user_password: '',
        confirm_user_password: ''
    });

    const [errorMessage, setErrorMessage] = useState(''); 

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const checkUsernameAvailability = async () => {
        try {
            const response = await axios.post("http://localhost:8080/checkUsername", { user_name: data.user_name });
            return response.data.isAvailable; 
        } catch (error) {
            console.error('Error checking username:', error);
            setErrorMessage("Error checking username availability");
            return false;
        }
    };

    const readValue = async () => {
        if (data.user_password !== data.confirm_user_password) {
            setErrorMessage("Passwords do not match");
        } else {
           
            const isAvailable = await checkUsernameAvailability();
            if (!isAvailable) {
                setErrorMessage("Username is already taken. Please choose another one.");
            } else {
                
                axios.post("http://localhost:8080/userSignUp", data)
                    .then((response) => {
                        if (response.data.status === "Saved") {
                            alert("Sign Up Successfully");
                            setData({ user_name: '', user_password: '', confirm_user_password: '' });
                            setErrorMessage('');
                        } else {
                            setErrorMessage("Sign Up Failed");
                        }
                    })
                    .catch((error) => {
                        setErrorMessage(`Error: ${error.message}`);
                    });
            }
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

                                {errorMessage && (
                                    <div className="alert alert-danger">
                                        {errorMessage}
                                    </div>
                                )}

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
