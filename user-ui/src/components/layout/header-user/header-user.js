import React from "react";
import "./header-user.scss";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/general/general-selector";
import {connect, useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {navigateToLogin, navigateToRegister, navigateToAccount} from "../../../util/navigation";
import HeaderButton from "../../common/header-button/header-button";
import * as generalActions from "../../../redux/general/general-actions";
import * as orderActions from "../../../redux/order/order-actions";

function HeaderUser({currentUser, history}) {
    const dispatch = useDispatch();
    const navigateToLoginFunc = () => {
        navigateToLogin(history);
    };
    const navigateToRegisterFunc = () => {
        navigateToRegister(history);
    };
    const navigateToAccountFunc = () => {
        navigateToAccount(history);
    };
    const logoutFunc = () => {
        dispatch(generalActions.logout());
        dispatch(orderActions.clearOrder());
    };
    return (
        <div className="header-user-component">
            {currentUser ?
                <div className="content">
                    <div className="title">Hello, <span id="nameLbl">{currentUser.name}</span></div>
                    <HeaderButton title="Logout" onClick={logoutFunc} id="logoutBtn" />
                    <HeaderButton title="Your Account" onClick={navigateToAccountFunc} id="accountBtn" />
                </div>
            :
                <div className="content">
                    <div className="title">Hello, <span id="nameLbl">guest</span></div>
                    <HeaderButton title="Login" onClick={navigateToLoginFunc} id="loginBtn" />
                    <HeaderButton title="Register" onClick={navigateToRegisterFunc} id="registerBtn" />
                </div>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default withRouter(connect(mapStateToProps)(HeaderUser));
