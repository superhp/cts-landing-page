import React from "react";

import { Menu } from "./components/menu/menu";
import { AppList } from "./components/appList/appList";

import "./app.less";

const App = () => {
    return (
        <React.Fragment>
            <Menu />
            <AppList />
        </React.Fragment>
    );
};

export { App };
