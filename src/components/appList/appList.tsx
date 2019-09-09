import React from "react";

import { Tile } from "../tile/tile";
import { appList } from "./appListData";

import "./appList.less";

const AppList = () => {
    return (
        <div className="app-list-container">
            <div className="tile-container">
                {appList.map((app, index) => {
                    return <Tile key={index} className={app.className} buttonClickListner={() => {location.href = app.url}} title={app.title} description={app.description}
                        url={app.url} buttonText={app.buttonText} />;
                })}
            </div>
        </div>
    );
};

export { AppList };
