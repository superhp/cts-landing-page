import React from "react";

import "./tile.less";

interface ITileProps {
    title: string;
    description: string;
    url: string;
    buttonText: string;
    className: string;
}

const Tile = (props: ITileProps) => {
    return (
        <div className={`tile ${props.className}`}>
            <div className="tile-description-container">
                <div className="tile-title">{props.title}</div>
                <div className="tile-description">{props.description}</div>
            </div>
            <div className="tile-action-container">
                <button>
                    {props.buttonText}

                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24">
                        <path d="M21 12l-18 12v-24z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export { Tile };
