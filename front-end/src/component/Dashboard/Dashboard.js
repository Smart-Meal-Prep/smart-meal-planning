import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import endPoints from '../../config/fetch.js'
import '../../styles/Dashboard.css'
import Navbar from './TopBar.js';

const Dashboard = (props) => {
    useEffect(() => { /*Needs test case by front-end team*/
        const findUserInfo = async () => {
            try {
                const response = await fetch(endPoints.loginEndpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Include credentials in the request to allow browser to send cookies
                });

                if (response.ok) {
                    const userData = await response.json();//resolves promis and turns the fetch information into JS object 
                    props.setUserInformation({
                        username: userData.username,
                        email: userData.email,
                        id: userData.id,
                    });
                };
            }
            catch (error) {
                return;
            }
        };
        findUserInfo();
    },
        []
    );

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            {/*
            <p>Dashboard container</p>
            <Link to='/register'>
                <button>Register</button>
            </Link>
            */}
        </div>
    );
};

export default Dashboard