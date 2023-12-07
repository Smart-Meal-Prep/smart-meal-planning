import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../../config/fetch.js"
import RegisterNavbar from "../Login/LoginNavbar.js"
import Swal from 'sweetalert2'
import "../../../styles/Registration.css"

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmission = async (event) => {
        event.preventDefault();
        if (!username) {
            return Swal.fire({
                icon: "error",
                title: "Invaild username",
                text: "Please enter a vaild username!",
            });
        };
        if (!email) {
            return Swal.fire({
                icon: "error",
                title: "Invaild email",
                text: "Please enter a vaild email!",
            });
        };
        if (!password) {
            return Swal.fire({
                icon: "error",
                title: "Invaild password",
                text: "Please enter a vaild password!",
            });
        };

        const user = {
            username: username,
            email: email,
            password: password
        };

        const requestBody = JSON.stringify(user);

        try {
            const res = await fetch(endPoints.registerEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                return navigate("/login");
            }
            else {
                const errorData = await res.json();
                return Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: `Error: ${errorData.message}`,
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleLoginClick = () => {
        return navigate("/login");
    }

    return (
        <div className="registration-container">
            <RegisterNavbar />
            <div className="registration-form" data-testid={"registration-form-div"}>
                <h3 className="text-center text-uppercase fs-2 text-dark mt-2 mb-4">Register</h3>
                <form onSubmit={handleSubmission} data-testid={"registration-submission-form"}>
                    <div class="form-group">
                        <label className="label-text" for="exampleInputUsername1">Username</label>
                        <input type="username" onChange={event => setUsername(event.target.value)} class="form-control" id="exampleInputUsername1" placeholder="Enter username" />
                    </div>
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
                    <button data-testid={"login-button"} type="button" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class" onClick={handleLoginClick} >Login</button>
                    <button data-testid={"sign-up-button"} type="submit" class="btn btn-primary col-lg-5 col-5 mt-2 mb-2 button-class">Confirm</button>
                </form>
            </div>
        </div>
    )
};

export default Register;
