import React from "react";
import "./layout-login.scss";
import Logo from "../logo/logo";

export default function LayoutLogin({children}) {
    return (
        <div className="layout-login-component">
            <div className="header">
                <Logo />
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}