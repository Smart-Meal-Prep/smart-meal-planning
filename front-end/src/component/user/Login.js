import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../config/fetch.js"
import UserInfo from "../../config/UserInfo.js";

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

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmission}>
                <label>
                    <p>Email:</p>
                    <input type="text" onChange={event => setEmail(event.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="text" onChange={event => setPassword(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login