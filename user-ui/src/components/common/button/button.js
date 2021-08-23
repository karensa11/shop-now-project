import React from "react";
import "./button.scss";

export default function Button({onClick, title, customClass}) {
    return (
        <div className="button-component">
            <div className={`button ${customClass}`} onClick={onClick}>
                {title}
            </div>
        </div>
    )
}