import React from "react";
import "./header-button.scss";
import Button from "../button/button";

export default function HeaderButton ({onClick, title}) {
    return (
        <Button customClass={"header-button-component"} onClick={onClick} title={title} />
    )
}
