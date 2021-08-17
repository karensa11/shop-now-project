import React from "react";
import "./header-cart.scss";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {itemsNumberSelector} from "../../../redux/order/order-selector";
import * as navigation from "../../../util/navigation";
import appIcons from "../../../util/applicationIcons";

function HeaderCart({itemsNumber, history}) {
    const navigateToCart = () => {
        navigation.navigateToCart(history);
    };
    return (
        <div className="header-cart-component" onClick={navigateToCart} title="view your cart">
            <img src={appIcons.cartIcon} alt=""/>
            <div className="items-number">
                {itemsNumber}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemsNumber: itemsNumberSelector
});

export default withRouter(connect(mapStateToProps)(HeaderCart));
