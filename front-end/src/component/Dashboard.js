import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import endPoints from '../config/fetch.js'

const Dashboard = (props) => {
    
    useEffect(() => { /*Needs test case by front-end team*/
        const findUserInfo = async () => {
            try {
                const response = await fetch(endPoints.loginEndpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                    credentials: 'include' // Include credentials in the request to allow browser to send cookis
                });

                if (response.ok) {
                    const userData = await response.json();//resolves promis and turns the fetch information into JS object 
                    props.setUserInformation({
                        username: userData.username,
                        email: userData.email,
                        id: userData.id,
                    })
                };
            }
            catch (error) {
                return;//we dont want to console log a error here, because its just checking if the user logged in or not
            }
        };

        findUserInfo();
    },
        []/*Array is empty so only runs once */
    );

    return (
        <div className='container'>
            <p>Dashboard container</p>
            <Link to='/register'>
                <button>Register</button>
            </Link>
            <Link to='/login'>
                <button>Login</button>
            </Link>
            <Link to='/profile'>
                <button>Profile</button>
            </Link>
            <Link to='/inventory'>
                <button>Inventory</button>
            </Link>                
        </div>
    );
}

export default Dashboard