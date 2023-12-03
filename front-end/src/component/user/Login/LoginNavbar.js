import React from "react";
import cooking_icon from "../../../assets/cooking_icon.png"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginNavbar = () => {
    return (
        <nav class="navbar navbar-light bg-light">
            <Link class="navbar-brand" to={"/"}>
                <img src={cooking_icon} width="40" height="40" class="d-inline-block align-top" alt="cooking_icon" />
            </Link>
        </nav>
    );
};

export default LoginNavbar