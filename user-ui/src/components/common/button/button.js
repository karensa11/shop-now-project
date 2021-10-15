import React from "react";
import "./button.scss";
import PropTypes from "prop-types";

export default function Button({onClick, title, customClass, id}) {
    return (
        <div className="button-component">
            <div className={`button ${customClass}`} onClick={onClick} id={id}>
                {title}
            </div>
        </div>
    )
}
Button.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    customClass: PropTypes.string,
    id: PropTypes.string,
};