import React from "react";
import axios from "axios";
import "./menu.less";

const logo = require("../../../public/img/cognizant-logo.svg");
const logoutClickHandler = (event: React.MouseEvent) => axios.get("https://auth.ctsbaltic.com/api/auth/signiout")
    .catch();

    const Menu = () => {
    return (
        <div className="menu-container">
            <img className="logo" src={logo} alt="Cognizant logo" />
            <div className="menu">
                <button onClick={logoutClickHandler} className="menu-item">Logout</button>
            </div>
        </div>
    );
};

export { Menu };
