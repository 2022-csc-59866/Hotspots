import {GoSignIn} from 'react-icons/go';
import './signup.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Signup() {
    const [userData, setUserData] = useState('');
    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [error, setError] = useState('');
    function userNameChange(event) {
        setUserData(event.target.value);
    }
    function emailChange(event) {
        setEmailData(event.target.value);
    }
    function passwordChange(event) {
        setPasswordData(event.target.value);
    }
    function submitHandler() {
        console.log(userData);
        console.log(emailData);
        console.log(passwordData);
        console.log(import.meta.env.VITE_APP_API_URL);
        // Verify credentials here
        let data = JSON.stringify({
            "username": userData,
            "email": emailData,
            "password": passwordData
        });
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/register',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.msg == "User Created") {
                window.location.href = "/login";
            } else {
                setError("Email already in use");
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-4">
                <div className="card text-center">
                <div className="card-body">
                    <h2 className="d-flex justify-content-center align-items-center card-title font-weight-set">
                        <GoSignIn size={42}></GoSignIn>SignUp
                    </h2>
                    <div className="mt-4 pt-4"></div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInputUserName" placeholder="XXXXXX" onChange={userNameChange}/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" onChange={emailChange}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={passwordChange}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {error !== '' && <p className="text-danger">{error}</p>}
                    <p className="text-dark">Already Registered?&nbsp;<Link to="/login">Login</Link> </p>
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Sign Up</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;