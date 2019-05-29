import React from "react";

import { Menu } from "./components/menu/menu";
import { Tile } from "./components/tile/tile";
import { appList } from "./appData";

import "./app.less";

const App = () => {
    return (
        <React.Fragment>
            <Menu />
            <div className="app-container">
                <div className="tile-container">
                    {appList.map((app, index) => {
                        return <Tile key={index} className={app.className} title={app.title} description={app.description}
                            url={app.url} buttonText={app.buttonText} />;
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

export { App };
