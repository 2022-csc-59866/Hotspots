import {GoLock} from "react-icons/go";
import './login.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function Login() {

    const [emailData, setEmailData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [error, setError] = useState('');
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    function emailChange(event) {
        setEmailData(event.target.value);
    }
    function passwordChange(event) {
        setPasswordData(event.target.value);
    }
    function submitHandler(event) {
        console.log(emailData);
        console.log(passwordData);
        //Verify credentials here
        let data = JSON.stringify({
            "email": emailData,
            "password": passwordData
        });
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.msg == "Login successful") {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('email', response.data.email);
                window.location.href = "/";
            } else {
                setError("Invalid credentials");
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }

    const GoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    });

    useEffect(
        () => {
            if (user.access_token !== undefined && user) {
                // axios
                //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                //         headers: {
                //             Authorization: `Bearer ${user.access_token}`,
                //             Accept: 'application/json'
                //         }
                //     })
                //     .then((res) => {
                //         setProfile(res.data);
                //         console.log(res.data);
                //         console.log(user);
                //         console.log(user.access_token);
                //     })
                //     .catch((err) => console.log(err));
                // console.log(user.access_token);
                let data = JSON.stringify({
                    "google_token": user.access_token
                });
                
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: import.meta.env.VITE_APP_API_URL + ':' + import.meta.env.VITE_APP_API_PORT + '/google_login',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };

                axios.request(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        if (response.data.msg == "Login successful") {
                            localStorage.setItem('token', response.data.access_token);
                            localStorage.setItem('email', response.data.email);
                            window.location.href = "/";
                        } else {
                            setError("Invalid credentials");
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });

            }
        },
        [ user ]
    );
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-4">
                <div className="card text-center">
                <div className="card-body">
                    <h2 className="d-flex justify-content-center align-items-center card-title font-weight-set">
                        <GoLock size={42}></GoLock>Login
                    </h2>
                    <div className="mt-4 pt-4"></div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={emailChange}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={passwordChange}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {error !== '' && <p className="text-danger">{error}</p>}
                    {/* <div className="d-flex justify-content-center mt-4"><GoogleLogin onSuccess={googleResponseMessage} onError={googleErrorMessage}></GoogleLogin></div> */}
                    <button type="submit" className="btn btn-primary" onClick={() => GoogleLogin()}>Sign in with Google</button>
                    <p className="text-dark mt-3">Not Registered?&nbsp;<Link to="/signup">Signup</Link> </p>
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Login</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;