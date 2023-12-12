import React from "react";
import { Link } from "react-router-dom";
import '../styles/DashboardFooter.css'

const DashboardFooter = () => {
    return (
        <footer className="page-footer font-small pt-4 bg-color">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"/"} className="footer-link">Home</Link></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"/about"} className="footer-link">About</Link></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"https://github.com/Smart-Meal-Prep/smart-meal-planning"} className="footer-link">Github</Link></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"/ctp"} className="footer-link">CTP</Link></h5>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default DashboardFooter