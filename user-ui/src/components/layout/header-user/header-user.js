import React, {useState} from "react";
import "./header-user.scss";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/general/general-selector";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {navigateToLogin, navigateToRegister} from "../../../util/navigation";
import HeaderButton from "../../common/header-button/header-button";
import * as generalActions from "../../../redux/general/general-actions";
import * as orderActions from "../../../redux/order/order-actions";

function HeaderUser({currentUser, history, logout, clearOrder}) {
    const navigateToLoginFunc = () => {
        navigateToLogin(history);
    };
    const navigateToRegisterFunc = () => {
        navigateToRegister(history);
    };
    const logoutFunc = () => {
        logout();
        clearOrder();
    };
    return (
        <div className="header-user-component">
            {currentUser ?
                <div className="header">
                    <div className="title">Hello, {currentUser.name}</div>
                    <HeaderButton title="Logout" onClick={logoutFunc} />
                </div>
            :
                <div className="header">
                    <div className="title">Hello, guest</div>
                    <HeaderButton title="Login" onClick={navigateToLoginFunc} />
                    <HeaderButton title="Register" onClick={navigateToRegisterFunc} />
                </div>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(generalActions.logout()),
    clearOrder: () => dispatch(orderActions.clearOrder())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderUser));
