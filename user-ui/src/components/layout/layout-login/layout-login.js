import React from "react";
import "./layout-login.scss";
import Logo from "../logo/logo";
import PropTypes from "prop-types";

export default function LayoutLogin({children}) {
    return (
        <div className="layout-login-component">
            <div className="header">
                <div className="button">
                <Logo />
                </div>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    )
}
LayoutLogin.propTypes = {
    children: PropTypes.any
};