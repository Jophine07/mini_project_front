import React from 'react';
import bgimg from "../images/bgimg.png";
import foot from "../images/footer.png";
import "../Style/Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
         
            <div className="alert alert-secondary" role="alert">
                <center>
                    <h1 className="decorative-heading">JOPHINE'S TURF </h1>
                    <h2 className="decorative-heading">"Our grass is always Greener"</h2>
                </center>
            </div>

           
            <div
                style={{
                    backgroundImage: `url(${bgimg})`,
                    height: '600px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                
                <div className="overlay"></div>

                
                <div className="d-grid gap-3 col-6 mx-auto text-center">
                    <Link className="btn btn-primary btn-lg shadow-lg" to="/adminLogin">
                        <h2>ADMIN LOGIN</h2>
                    </Link>
                    <Link className="btn btn-primary btn-lg shadow-lg" to="/userLogin">
                        <h2>USER LOGIN</h2>
                    </Link>
                    <Link className="btn btn-primary btn-lg shadow-lg" to="/usersignup">
                        <h2>USER SIGNUP</h2>
                    </Link>
                </div>
            </div>

           
            <div
                style={{
                    backgroundImage: `url(${foot})`,
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    marginTop: '-10px'
                }}
            ></div>
        </div>
    );
};

export default Home;
