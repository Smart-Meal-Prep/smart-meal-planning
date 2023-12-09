import { React, useEffect, useContext } from 'react'
import endPoints from '../../config/fetch.js'
import NavigationBar from './NavigationBar.js';
import Dashboardbody from './Dashboardbody.js';
import DashboardFooter from './DashboardFooter.js';
import UserInfo from '../../config/UserInfo.js';
import '../../styles/Dashboard.css'

const Dashboard = () => {
    const { setUserInformation } = useContext(UserInfo);

    useEffect(() => {
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
                    const userData = await response.json();
                    setUserInformation({
                        username: userData.username,
                        email: userData.email,
                        id: userData.id
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
        <div >
            <NavigationBar />
            <Dashboardbody />
            <DashboardFooter />
        </div>
    );
};

export default Dashboard