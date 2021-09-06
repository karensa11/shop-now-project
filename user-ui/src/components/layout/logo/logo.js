import React from "react";
import {useHistory} from "react-router-dom";
import "./logo.scss";
import * as navigation from "../../../util/navigation";
import Button from "../../common/button/button";

export default function Logo() {
    const history = useHistory();
    const navigateHome = () => {
        navigation.navigateToHomePage(history);
    };
    return (
        <Button customClass="logo-component" onClick={navigateHome} id="logoBtn" title="Shop Now" />
    )
}
