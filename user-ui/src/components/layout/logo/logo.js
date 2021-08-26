import React from "react";
import {withRouter} from "react-router-dom";
import "./logo.scss";
import * as navigation from "../../../util/navigation";
import Button from "../../common/button/button";

function Logo({history}) {
    const navigateHome = () => {
        navigation.navigateToHomePage(history);
    };
    return (
        <Button customClass="logo-component" onClick={navigateHome} id="logoBtn" title="Shop Now" />
    )
}

export default withRouter(Logo);
