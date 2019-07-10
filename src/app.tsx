import React, { useState } from "react";

import { Login } from "./components/login/login";
import { Menu } from "./components/menu/menu";
import { AppList } from "./components/appList/appList";

import "./app.less";

const App = () => {
    const [user, setUser] = useState({ isLoggedIn: false, isVerified: false });

    return (
        user.isLoggedIn ? (
            <React.Fragment>
                <Menu />
                <AppList />
            </React.Fragment>
        ) :
        <Login isVerified={user.isVerified} />
    );
};

export { App };
