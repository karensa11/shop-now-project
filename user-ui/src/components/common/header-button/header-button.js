import React from "react";
import "./header-button.scss";
import Button from "../button/button";
import PropTypes from "prop-types";

export default function HeaderButton ({onClick, title, id}) {
    return (
        <Button customClass={"header-button-component"} onClick={onClick} title={title} id={id} />
    )
}
HeaderButton.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string,
};