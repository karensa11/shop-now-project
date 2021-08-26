import React from "react";
import "./label-section.scss";

export default function LabelSection({text, customClass, id}) {
    return (
        <div className={customClass ? customClass : 'label-section-section-component'} id={id}>
            {text}
        </div>
    )
}
