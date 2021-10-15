import React, {useEffect, useState} from "react";
import "./text-input.scss";
import {INPUT_TYPES_DATA, INPUT_TYPES} from "./text-input-types";
import appIcons from "../../../util/applicationIcons";
import PropTypes from "prop-types";

export default function TextInput({onChange, name, title, type, required, forceValidate, comparePassword, id}) {
    const [value, setValue] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const typeData = INPUT_TYPES_DATA[type];
    const validate = (value) => {
        let internalValidationMessage = null;
        if (required && (value === "")) {
            internalValidationMessage = `${title} is required`;
        } else {
            if (typeData) {
                const valid = typeData.validatorExpression.test(value);
                if (!valid) {
                    internalValidationMessage = typeData.validationMessage
                }
            }
        }
        if (type === INPUT_TYPES.CONFIRM_PASSWORD && value !== comparePassword) {
            internalValidationMessage = "password do not match";
        }
        setValidationMessage(internalValidationMessage);
        return internalValidationMessage;
    };
    const switchShowImage = () => {
        setShowPassword(!showPassword);
    };
    const validateAndSave = (e) => {
        const {value} = e.target;
        setValue(value);
        const internalValidationMessage = validate(value);
        onChange(value, name, !internalValidationMessage);
    };
    useEffect(() => {
        if (forceValidate) {
            validate(value);
        }
    }, [forceValidate, value]);
    const isPassword = (type === INPUT_TYPES.PASSWORD || type === INPUT_TYPES.CONFIRM_PASSWORD);
    const inputType = (isPassword && showPassword) ?
        "text" : typeData.formType;
    return (
        <div className="text-input-component">
            <div className="title">
                {title}
            </div>
            <div className="input-field">
                {isPassword &&
                    <img src={showPassword ? appIcons.hideIcon : appIcons.viewIcon} onClick={switchShowImage} alt="" />
                }
                <input type={inputType} name={name} onChange={validateAndSave} size={isPassword ? "47" : "50"}
                       onFocus={validateAndSave} className={validationMessage ? "invalid" : ""} id={id}/>
            </div>
            {validationMessage &&
                <div className="validation-message">
                    {validationMessage}
                </div>
            }
        </div>
    )
}
TextInput.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    comparePassword: PropTypes.string,
    forceValidate: PropTypes.bool,
    required: PropTypes.bool,
    id: PropTypes.string,
};
