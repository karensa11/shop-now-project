import React, {useEffect, useState} from "react";
import "./register-page.scss";
import LayoutLogin from "../../layout/layout-login/layout-login";
import TextInput from "../../common/text-input/text-input";
import {INPUT_TYPES as TYPES} from "../../common/text-input/text-input-types";
import Button from "../../common/button/button";
import {navigateToLogin} from "../../../util/navigation";
import {useHistory} from "react-router-dom";
import SubmitBtn from "../../common/submit-btn/submit-btn";
import * as actions from "../../../server/actions";
import {useDispatch} from "react-redux";

export default function RegisterPage() {
    const [formValues, setFormValues] = useState(
        {[TYPES.NAME]: "", [TYPES.EMAIL]: "", [TYPES.PASSWORD]: "", [TYPES.CONFIRM_PASSWORD]: ""});
    const [validity, setValidity] = useState(
        {[TYPES.NAME]: false, [TYPES.EMAIL]: false, [TYPES.PASSWORD]: false, [TYPES.CONFIRM_PASSWORD]: false});
    const [forceValidate, setForceValidate] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const register = (userDetails) => {
        dispatch(actions.register(userDetails, detailsAlreadyExists, submitFailed));
    };
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
    const submitFailed = () => {
        alert("registration failed");
    };
    const submit = () => {
        const inputData = {
            name: formValues[TYPES.NAME],
            email: formValues[TYPES.EMAIL],
            passwordPartial: formValues[TYPES.PASSWORD],
        };
        register(inputData);
    };
    const password = formValues[TYPES.PASSWORD];
    return (
        <LayoutLogin>
            <div className="register-page">
                <TextInput name={TYPES.NAME} type={TYPES.NAME}
                           title="enter name" forceValidate={forceValidate}
                           onChange={valueChanged} id="nameInput" />
                <TextInput name={TYPES.EMAIL} type={TYPES.EMAIL}
                           title="enter email" forceValidate={forceValidate}
                           onChange={valueChanged} id="emailInput" />
                <TextInput name={TYPES.PASSWORD} type={TYPES.PASSWORD}
                           title="enter password" forceValidate={forceValidate}
                           onChange={valueChanged} id="passwordInput" />
                <TextInput name={TYPES.CONFIRM_PASSWORD} type={TYPES.CONFIRM_PASSWORD}
                           title="confirm password" forceValidate={forceValidate}
                           onChange={valueChanged} id="confirmPasswordInput" comparePassword={password} />
            </div>
            <SubmitBtn title="Register" onClick={submit} validityArray={validity} setForceValidate={setForceValidate}
                       id="submitRegisterBtn"/>
            <div>Already have an account ?</div>
            <Button title="Login to account" onClick={navigateToLoginFunc} />
        </LayoutLogin>
    )
}
