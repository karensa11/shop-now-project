import React, {useState, useEffect} from "react";
import "./login-page.scss";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import LayoutLogin from "../../layout/layout-login/layout-login";
import TextInput from "../../common/text-input/text-input";
import {INPUT_TYPES} from "../../common/text-input/text-input-types";
import SubmitBtn from "../../common/submit-btn/submit-btn";
import * as actions from "../../../server/actions";
import * as generalActions from "../../../redux/general/general-actions";
import Button from "../../common/button/button";
import {navigateToRegister} from "../../../util/navigation";

export default function LoginPage() {
    const [formValues, setFormValues] = useState({[INPUT_TYPES.EMAIL]: "", [INPUT_TYPES.PASSWORD]: ""});
    const [validity, setValidity] = useState({[INPUT_TYPES.EMAIL]: false, [INPUT_TYPES.PASSWORD]: false});
    const [forceValidate, setForceValidate] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const valueChanged = (value, name, isValid) => {
        const formValuesUpdated = {...formValues};
        const validityUpdated = {...validity};
        validityUpdated[name] = isValid;
        formValuesUpdated[name] = value;
        setFormValues(formValuesUpdated);
        setValidity(validityUpdated);
    };
    const navigateToRegisterFunc = () => {
        navigateToRegister(history);
    };
    const login = (loginData) => {
        dispatch(actions.login(loginData, onLoginFailed, userDetailsSuccess));
    };
    const onLoginFailed = () => {
        alert("user not found or password is wrong");
    };
    const userDetailsSuccess = (userDetails) => {
        dispatch(generalActions.login(userDetails));
        if (!userDetails.isAdmin && userDetails.orderDetails) {
            dispatch(actions.getOrderDetails(userDetails.orderDetails));
        }
    };
    const submit = () => {
        const inputData = {
            email: formValues[INPUT_TYPES.EMAIL],
            passwordPartial: formValues[INPUT_TYPES.PASSWORD]
        };
        login(inputData);
    };
    useEffect(() => {
        if (forceValidate) {
            setForceValidate(false);
        }
    }, [forceValidate]);
    return (
        <LayoutLogin>
            <div className="login-page">
                <TextInput name={INPUT_TYPES.EMAIL} type={INPUT_TYPES.EMAIL}
                           title="enter email" forceValidate={forceValidate}
                           onChange={valueChanged} id="emailInput" />
                <TextInput name={INPUT_TYPES.PASSWORD} type={INPUT_TYPES.PASSWORD}
                           title="enter password" forceValidate={forceValidate}
                           onChange={valueChanged} id="passwordInput" />
                <SubmitBtn title="Login" onClick={submit} validityArray={validity} setForceValidate={setForceValidate}
                           id="submitLoginBtn" />
                <div>don&apos;t have an account yet ?</div>
                <Button title="Create an account" onClick={navigateToRegisterFunc} id="navigateToRegister" />
            </div>
        </LayoutLogin>
    )
}
