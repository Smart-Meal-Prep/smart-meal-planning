import { React } from 'react'
import NavigationBar from '../NavigationBar.js';
import Dashboardbody from './Dashboardbody.js';
import DashboardFooter from '../DashboardFooter.js';
import '../../styles/Dashboard.css'

const Dashboard = () => {
    return (
        <div >
            <NavigationBar />
            <Dashboardbody />
            <DashboardFooter />
        </div>
    );
};

export default Dashboard