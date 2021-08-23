import React from "react";
import "./submit-btn.scss";
import Button from "../button/button";

export default function SubmitBtn({title, onClick, validityArray, setForceValidate}) {
    const validateAndClick = () => {
        let isValid = true;
        Object.keys(validityArray).forEach(key => {
            if (!validityArray[key]) {
                isValid = false;
            }
        });
        if (isValid) {
            onClick();
        } else {
            setForceValidate(true);
        }
    };
    return (
        <Button customClass="submit-btn-component" onClick={validateAndClick} title={title} />
    )
}