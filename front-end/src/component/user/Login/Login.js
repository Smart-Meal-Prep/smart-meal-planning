import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../../config/fetch.js"
import UserInfo from "../../../config/UserInfo.js";
import LoginNavbar from "./LoginNavbar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Login.css'

const Login = () => {
    const { setStatus } = useContext(UserInfo);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmission = async (event) => {
        event.preventDefault();
        if (!email) {
            return alert('Please provide vaild email');
        }//need to check if it matchs a vaild email
        if (!password) {
            return alert('Please provide vaild password');
        }//need to check if the password is a vaild length, has to be atleast length 8
        const user = {
            email: email,
            password: password
        };

        const requestBody = JSON.stringify(user);
        try {
            const res = await fetch(endPoints.loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                credentials: 'include' // Include credentials in the request to allow browser to send cookis
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                setStatus({
                    LoggedIn: true
                });
                return navigate("/");
            }
            else {
                const errorData = await res.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleSignUpClick = () =>{
        return navigate("/register");
    }

    return (
        <div className="login-container">
            <LoginNavbar />
            <div className="login-form">
                <h3 className="text-center text-uppercase fs-2 text-dark mt-2 mb-4">Login</h3>
                <form onSubmit={handleSubmission}>
                    <div class="form-group">
                        <label className="label-text" for="exampleInputEmail1">Email address</label>
                        <input type="email" onChange={event => setEmail(event.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">Your email is safe with us</small>
                    </div>
                    <div class="form-group">
                        <label className="label-text" for="exampleInputPassword1">Password</label>
                        <input type="password" onChange={event => setPassword(event.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-group form-check">
                    </div>
                    <button type="button" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class" onClick={handleSignUpClick} >Sign Up</button>
                    <button type="submit" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login