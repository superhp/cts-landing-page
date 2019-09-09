import React, { useState, useEffect } from "react";

import { Login } from "./components/login/login";
import { Menu } from "./components/menu/menu";
import { AppList } from "./components/appList/appList";
import { createGlobalState } from "react-hooks-global-state";
import "./app.less";
import { api } from "./helpers/axiosHelper";
import { Snackbars } from "./components/snackbar/snackbar";
import { createGlobalStore, useGlobalState } from "./store/state";

const App = () => {

    const [user, setUser] = useState({ isLoggedIn: false, isVerified: false });
    const [snackbar] = useGlobalState("snackbar");
    useEffect(() => {
        if (!user.isLoggedIn) {

            api.get("auth/user")
                .then((response) => {
                    setUser({ isLoggedIn: true, isVerified: response.data.isVerified });
                })
                .catch();
        }
    });
    return (
        <div>
            <Menu isVerified={user.isVerified} isLoggedIn={user.isLoggedIn} />
            {
                user.isVerified ? (
                    <React.Fragment>
                        <AppList />
                    </React.Fragment>
                ) :
                    <Login isVerified={user.isVerified} isLoggedIn={user.isLoggedIn} />
            }
            <Snackbars
                message={snackbar.message}
                show={snackbar.show}
                variant={snackbar.variant}
            />
        </div>

    );
};
export { App };
