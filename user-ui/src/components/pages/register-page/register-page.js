import React, {useEffect, useState} from "react";
import "./register-page.scss";
import LayoutLogin from "../../layout/layout-login/layout-login";
import LoginTextInput from "../../common/login-text-input/login-text-input";
import {INPUT_TYPES} from "../../common/login-text-input/login-text-types";
import Button from "../../common/button/button";
import {navigateToLogin} from "../../../util/navigation";
import {withRouter} from "react-router-dom";
import SubmitBtn from "../../common/submit-btn/submit-btn";
import * as actions from "../../../server/actions";
import {useDispatch} from "react-redux";

function RegisterPage({history}) {
    const [formValues, setFormValues] = useState({[INPUT_TYPES.NAME]: "", [INPUT_TYPES.EMAIL]: "", [INPUT_TYPES.PASSWORD]: "", [INPUT_TYPES.CONFIRM_PASSWORD]: ""});
    const [validity, setValidity] = useState({[INPUT_TYPES.NAME]: false, [INPUT_TYPES.EMAIL]: false, [INPUT_TYPES.PASSWORD]: false, [INPUT_TYPES.CONFIRM_PASSWORD]: false});
    const [forceValidate, setForceValidate] = useState(false);
    const dispatch = useDispatch();
    const register = (userDetails) => {
        dispatch(actions.register(userDetails, detailsAlreadyExists));
    }
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
    const navigateToLoginFunc = () => {
        navigateToLogin(history);
    };
    const detailsAlreadyExists = () => {
        alert("email already exists");
    };
    const submit = () => {
        const inputData = {
            name: formValues[INPUT_TYPES.NAME],
            email: formValues[INPUT_TYPES.EMAIL],
            passwordPartial: formValues[INPUT_TYPES.PASSWORD],
        };
        register(inputData, detailsAlreadyExists);
    };
    const password = formValues[INPUT_TYPES.PASSWORD];
    return (
        <LayoutLogin>
            <div className="register-page">
                <LoginTextInput name={INPUT_TYPES.NAME} type={INPUT_TYPES.NAME} title="enter name" forceValidate={forceValidate}
                                onChange={valueChanged} id="nameInput" />
                <LoginTextInput name={INPUT_TYPES.EMAIL} type={INPUT_TYPES.EMAIL} title="enter email" forceValidate={forceValidate}
                                onChange={valueChanged} id="emailInput" />
                <LoginTextInput name={INPUT_TYPES.PASSWORD} type={INPUT_TYPES.PASSWORD} title="enter password" forceValidate={forceValidate}
                                onChange={valueChanged} id="passwordInput" />
                <LoginTextInput name={INPUT_TYPES.CONFIRM_PASSWORD} type={INPUT_TYPES.CONFIRM_PASSWORD} title="confirm password" forceValidate={forceValidate}
                                onChange={valueChanged} id="confirmPasswordInput" comparePassword={password} />
            </div>
            <SubmitBtn title="Register" onClick={submit} validityArray={validity} setForceValidate={setForceValidate} id="submitRegisterBtn"/>
            <div>Already have an account ?</div>
            <Button title="Login to account" onClick={navigateToLoginFunc} />
        </LayoutLogin>
    )
}

export default withRouter(RegisterPage);
