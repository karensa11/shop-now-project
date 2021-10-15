import React from "react";
import "./submit-btn.scss";
import Button from "../button/button";
import PropTypes from "prop-types";

export default function SubmitBtn({onClick, title, validityArray, setForceValidate, id}) {
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
        <Button customClass="submit-btn-component" onClick={validateAndClick} title={title} id={id} />
    )
}
SubmitBtn.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    validityArray: PropTypes.object,
    setForceValidate: PropTypes.func,
    id: PropTypes.string,
};