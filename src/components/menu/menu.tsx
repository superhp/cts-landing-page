import React from "react";
import axios from "axios";
import "./menu.less";
import { api } from "../../helpers/axiosHelper";

const logo = require("../../../public/img/cognizant-logo.svg");
const logoutClickHandler = (event: React.MouseEvent) =>
    location.href = "http://localhost:51581/api/auth/signout";
//    location.href = "https://auth.ctsbaltic.com/api/auth/signout";

interface IMenuProps {
    isVerified: boolean;
    isLoggedIn: boolean;
}

const Menu = (props: IMenuProps) => {
    return (
        <div className="menu-container">
            {props.isVerified &&
                <img className="logo" src={logo} alt="Cognizant logo" />
            }
            {props.isLoggedIn &&
                <div className="menu">
                    <button onClick={logoutClickHandler} className="menu-item">Logout</button>
                </div>
            }
        </div>
    );
};

export { Menu };
