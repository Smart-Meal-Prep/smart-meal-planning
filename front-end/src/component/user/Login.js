import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../config/Fetch"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmission = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior of refreshing on submission
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
        
        const requestBody = JSON.stringify(user);// Convert the data to a JSON string for sending to fetch call

        try {
            const res = await fetch(endPoints.loginEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: requestBody,// Include the request body
                credentials: 'include' // Include credentials in the request to allow browser to send cookis
            });

            if (res.ok) {// Request was successful (status code 2xx)
                const responseData = await res.json();
                console.log('Response data:', responseData);
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
    )
}

export default Login