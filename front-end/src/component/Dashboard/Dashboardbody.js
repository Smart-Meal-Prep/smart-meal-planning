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
        </div>
    );
};

export default Dashboardbody