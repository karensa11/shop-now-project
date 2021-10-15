import React from "react";
import "./label-section.scss";
import PropTypes from "prop-types";

export default function LabelSection({text, customClass, id}) {
    return (
        <div className={customClass ? customClass : "label-section-section-component"} id={id}>
            {text}
        </div>
    )
}
LabelSection.propTypes = {
    text: PropTypes.string,
    customClass: PropTypes.string,
    id: PropTypes.string,
};