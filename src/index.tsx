import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";

import { App } from "./app";
import { createGlobalStore } from "./store/state";
(async () => {
    const store = await createGlobalStore();

    ReactDOM.render(
        <store.GlobalStateProvider>
            <App />
        </store.GlobalStateProvider>, document.getElementById("root"));
}
)();
