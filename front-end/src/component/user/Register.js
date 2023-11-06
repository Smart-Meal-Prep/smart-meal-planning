import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

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

        //After checking now need to do the fetching

        const user = {
            username: username,
            email: email,
            password: password
        };
        
        const requestBody = JSON.stringify(user);// Convert the data to a JSON string

        try {
            const res = await fetch('http://localhost:3001/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: requestBody// Include the request body
            });

            if (res.ok) {// Request was successful (status code 2xx)
                const responseData = await res.json();
                console.log('Response data:', responseData);
            }
            else {
                const errorData = await res.json();
                alert(`Registration failed: ${errorData.message}`);
            }
            return navigate("/login");
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
