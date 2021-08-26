import React from "react";
import "./button.scss";

export default function Button({onClick, title, customClass, id}) {
    return (
        <div className="button-component">
            <div className={`button ${customClass}`} onClick={onClick} id={id}>
                {title}
            </div>
        </div>
    )
}