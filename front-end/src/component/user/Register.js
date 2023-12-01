import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../config/fetch.js"

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmission = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior of refreshing on submission
        if (!username) {
            return alert('Please provide vaild username');
        }//need to check if the username is a vaild length, has to be atleast length 8
        if (!password) {
            return alert('Please provide vaild password');
        }//need to check if the password is a vaild length, has to be atleast length 8
        if (!email) {
            return alert('Please provide vaild email');
        }//need to check if it matchs a vaild email

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
                alert(`Registration failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmission}>
                <label>
                    <p>Username:</p>
                    <input type="text" onChange={event => setUsername(event.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="text" onChange={event => setPassword(event.target.value)} />
                </label>
                <label>
                    <p>Email:</p>
                    <input type="text" onChange={event => setEmail(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default Register;
