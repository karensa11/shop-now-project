import React, {useState, useEffect} from "react";
import "./login-page.scss";
import LayoutLogin from "../../layout/layout-login/layout-login";
import LoginTextInput from "../../common/login-text-input/login-text-input";
import {INPUT_TYPES} from "../../common/login-text-input/login-text-types";
import SubmitBtn from "../../common/submit-btn/submit-btn";
import * as actions from "../../../server/actions";
import * as generalActions from "../../../redux/general/general-actions";
import {connect} from "react-redux";
import Button from "../../common/button/button";
import {navigateToRegister} from "../../../util/navigation";
import {withRouter} from "react-router-dom";

function LoginPage({login, getUserDetails, setUserDetails, getOrderDetails, history}) {
    const [formValues, setFormValues] = useState({[INPUT_TYPES.EMAIL]: "", [INPUT_TYPES.PASSWORD]: ""});
    const [validity, setValidity] = useState({[INPUT_TYPES.EMAIL]: false, [INPUT_TYPES.PASSWORD]: false});
    const [forceValidate, setForceValidate] = useState(false);
    const valueChanged = (value, name, isValid) => {
        const formValuesUpdated = {...formValues};
        const validityUpdated = {...validity};
        validityUpdated[name] = isValid;
        formValuesUpdated[name] = value;
        setFormValues(formValuesUpdated);
        setValidity(validityUpdated);
    };
    useEffect(() => {
        if (forceValidate) {
            setForceValidate(false);
        }
    }, [forceValidate]);
    const navigateToRegisterFunc = () => {
        navigateToRegister(history);
    };
    const onLoginFailed = () => {
        alert("user not found or password is wrong");
    };
    const userDetailsSuccess = (userDetails) => {
        setUserDetails(userDetails);
        if (userDetails.orderDetails) {
            getOrderDetails(userDetails.orderDetails);
        }
    };
    const loginSuccess = (userId) => {
        getUserDetails(userId, userDetailsSuccess);
    };
    const submit = () => {
        const inputData = {
            email: formValues[INPUT_TYPES.EMAIL],
            passwordPartial: formValues[INPUT_TYPES.PASSWORD]
        };
        login(inputData, onLoginFailed, loginSuccess);
    };
    return (
        <LayoutLogin>
            <div className="login-page">
                <LoginTextInput name={INPUT_TYPES.EMAIL} type={INPUT_TYPES.EMAIL} title="enter email" forceValidate={forceValidate}
                                onChange={valueChanged} id="emailInput" />
                <LoginTextInput name={INPUT_TYPES.PASSWORD} type={INPUT_TYPES.PASSWORD} title="enter password" forceValidate={forceValidate}
                                onChange={valueChanged} id="passwordInput" />
                <SubmitBtn title="Login" onClick={submit} validityArray={validity} setForceValidate={setForceValidate} id="submitLoginBtn" />
                <div>don't have an account yet ?</div>
                <Button title="Create an account" onClick={navigateToRegisterFunc} id="navigateToRegister" />
            </div>
        </LayoutLogin>
    )
}

const mapDispatchToProps = (dispatch) => ({
    login: (loginData, onLoginFailed, loginSuccess) => dispatch(actions.login(loginData, onLoginFailed, loginSuccess)),
    getUserDetails: (userId, userDetailsSuccess) => dispatch(actions.getLoginData(userId, userDetailsSuccess)),
    setUserDetails: (userDetails) => dispatch(generalActions.login(userDetails)),
    getOrderDetails: (orderDetails) => dispatch(actions.getOrderDetails(orderDetails))
});

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));