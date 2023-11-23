import { React, useEffect } from 'react'
import endPoints from '../../config/fetch.js'
import '../../styles/Dashboard.css'
import NavigationBar from './NavigationBar.js';

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
                <NavigationBar />
            </div>
        </div>
    );
};

export default Dashboard