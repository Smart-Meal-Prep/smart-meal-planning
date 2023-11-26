import React from "react";
import '../../styles/DashboardFooter.css'

const DashboardFooter = () => {
    return (
        <footer className="page-footer font-small pt-4 bg-color">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><a href="/" className="footer-link">Home</a></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><a href="/about" className="footer-link">About</a></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><a href="https://github.com/Smart-Meal-Prep/smart-meal-planning" className="footer-link">Github</a></h5>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase"><a href="/ctp" className="footer-link">CTP</a></h5>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default DashboardFooter