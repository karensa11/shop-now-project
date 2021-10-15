import React from "react";
import {formatPrice} from "../../../util/formatter";
import PropTypes from "prop-types";

export default function Price({price}) {
    const formattedPrice = formatPrice(price);
    return (
        <span>{formattedPrice}</span>
    )
}
Price.propTypes = {
    price: PropTypes.number,
};