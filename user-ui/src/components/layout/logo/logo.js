import React from "react";
import {withRouter} from "react-router-dom";
import "./logo.scss";
import * as navigation from "../../../util/navigation";

function Logo({history}) {
    const navigateHome = () => {
        navigation.navigateToHomePage(history);
    };
    return (
        <div className="logo-component" onClick={navigateHome}>
            Shop Now
        </div>
    )
}

export default withRouter(Logo);
