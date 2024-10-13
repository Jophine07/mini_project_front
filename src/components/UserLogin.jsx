import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
    let navigate = useNavigate();

    const [data, setData] = useState({
        user_name: '',
        user_password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/userLogin', data);
            if (response.data.status === 'login success') {
                // Store token if provided by the server
                if (response.data.token) {
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('user_name', data.user_name);
                }
                alert("You are logged in");
                navigate('/addturf');
            } else if (response.data.status === 'User Not Found') {
                setErrorMessage('User Name Does Not Exist');
            } else {
                setErrorMessage('Incorrect Password');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <center><b><h3>USER LOGIN</h3></b></center>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card w-50 mx-auto border-rounded text-bg-light border-info">
                            <div className="card-body">
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label htmlFor="user_name" className="form-label">
                                            Enter your Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="user_name"
                                            value={data.user_name}
                                            onChange={inputHandler}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="user_password" className="form-label">
                                            Enter your Password
                                        </label>
                                        <input
                                            type="password"
                                            name="user_password"
                                            className="form-control"
                                            value={data.user_password}
                                            onChange={inputHandler}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <center>
                                            <button
                                                className="btn btn-success"
                                                onClick={readValue}
                                                disabled={loading}
                                            >
                                                {loading ? 'Logging in...' : 'Login'}
                                            </button>
                                            <br /><br />
                                            <Link to="/">Back to home page</Link>
                                        </center>
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

export default UserLogin;
