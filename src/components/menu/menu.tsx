import React, { useState } from "react";
import axios from "axios";
import "./menu.less";

const logo = require("../../../public/img/cognizant-logo.svg");

const Menu = () => {

    const logoutClickHandler = (event: React.MouseEvent) => axios.get("https://auth.ctsbaltic.com/api/auth/signiout")
        .catch();

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
