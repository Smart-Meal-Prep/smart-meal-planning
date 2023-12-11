import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import '../../styles/DashboardFooter.css'

const DashboardFooter = () => {
    return (
        <footer className="page-footer font-small pt-4 bg-color">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase scroll-button"><ScrollLink to={"nav-color"} smooth={true} duration={100} className="footer-link">Home</ScrollLink></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link className="footer-link">About</Link></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"https://github.com/Smart-Meal-Prep/smart-meal-planning"} className="footer-link">Github</Link></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><Link to={"https://www.linkedin.com/company/cuny-tech-prep/posts/?feedView=all"} className="footer-link">CTP</Link></h5>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default DashboardFooter