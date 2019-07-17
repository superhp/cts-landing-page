import React, { useState, useEffect } from "react";

import { Login } from "./components/login/login";
import { Menu } from "./components/menu/menu";
import { AppList } from "./components/appList/appList";
import axios from "axios";
import "./app.less";

const App = () => {
    const [user, setUser] = useState({ isLoggedIn: false, isVerified: false });
    useEffect(() => {
        if(!user.isLoggedIn) {
            const api = axios.create({
                withCredentials: true,
            });
            api.get("https://auth.ctsbaltic.com/api/auth/user")
                .then((response) => { 
                    setUser({ isLoggedIn: true, isVerified: response.data.IsVerified });
                })
                .catch();
        }
    });
    return (
        user.isVerified ? (
            <React.Fragment>
                <Menu />
                <AppList />
            </React.Fragment>
        ) :
        <Login isVerified={user.isVerified} />
    );
};
export { App };
