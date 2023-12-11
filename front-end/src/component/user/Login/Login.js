import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../../config/fetch.js"
import UserInfo from "../../../config/UserInfo.js";
import LoginNavbar from "./LoginNavbar.js";
import Swal from 'sweetalert2'
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
            return Swal.fire({
                icon: "error",
                title: "Invaild email",
                text: "Please enter a vaild email!",
            });
        }
        if (!password) {
            return Swal.fire({
                icon: "error",
                title: "Invaild password",
                text: "Please enter a vaild password!",
            });
        }
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
                    'Access-Control-Allow-Origin': '*'
                },
                body: requestBody,
                credentials: 'include' // Include credentials in the request to allow browser to send cookis
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                Swal.fire({
                    title: `${responseData}`,
                    icon: "success"
                });
                setTimeout(() => {
                    setStatus({
                        LoggedIn: true
                    });
                    return navigate("/");
                }, 500);
                return;
            }
            else {
                const errorData = await res.json();
                return Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: `Error: ${errorData.message}`,
                });
            };
        }
        catch (error) {
            console.log(error);
        };
    };

    const handleSignUpClick = () => {
        return navigate("/register");
    }

    return (
        <div className="login-container">
            <LoginNavbar />
            <div className="login-form" data-testid={"login-form-div"}>
                <h3 className="text-center text-uppercase fs-2 text-dark mt-2 mb-4">Login</h3>
                <form onSubmit={handleSubmission} data-testid={"login-submission-form"}>
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
                    <button data-testid={"login-button"} type="button" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class" onClick={handleSignUpClick} >Sign Up</button>
                    <button data-testid={"sign-up-button"} type="submit" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login