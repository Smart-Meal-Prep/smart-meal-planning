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
                    <h3>Info 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="info-box">
                    <h3>Info 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="info-box">
                    <h3>Info 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboardbody;