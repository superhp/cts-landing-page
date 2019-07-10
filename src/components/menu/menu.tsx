import React from "react";

import "./menu.less";

const logo = require("../../../public/img/cognizant-logo.svg");

const Menu = () => {
    return (
        <div className="menu-container">
            <img className="logo" src={logo} alt="Cognizant logo" />
            <div className="menu">
                <button className="menu-item">Logout</button>
            </div>
        </div>
    );
};

export { Menu };
