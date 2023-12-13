import React from "react";
import { Image } from 'react-bootstrap';
import cooking_logo from "../../assets/cooking_logo.png"
import food_background from "../../assets/foodpat.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboardbody.css'

const Dashboardbody = () => {
    return (
        <div className="img-background">
            <Image src={food_background} fluid className="img-area" />
            <div className="logo-container">
                <Image src={cooking_logo} fluid className="name-logo" />
            </div>
            <div className="info-boxes">
                <div className="info-box">
                    <h3>Get Started</h3>
                    <p>Explore culinary possibilities on our website by effortlessly managing your ingredient inventory </p>
                </div>
                <div className="info-box">
                    <h3>Sign Up</h3>
                    <p>Create an account now to add ingredients and discover a variety of recipes that match the items in your stock</p>
                </div>
                <div className="info-box">
                    <h3>Peace of Mind</h3>
                    <p>Elevate your kitchen confidence as we guide you towards stress-free and enjoyable meal preparation</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboardbody;