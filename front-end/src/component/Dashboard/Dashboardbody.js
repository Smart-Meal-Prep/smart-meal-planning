import React from "react";
import { Container, Image } from 'react-bootstrap';
import cooking_logo from "../../assets/cooking_logo.png"
import food_background from "../../assets/foodpat.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Dashboardbody.css'

const Dashboardbody = () => {
    return (
        <div >
            <Image src={food_background} fluid className="img-container" />
        </div>
    )
}

export default Dashboardbody