import React from "react";
import "./header-cart.scss";
import {useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {itemsNumberSelector} from "../../../redux/order/order-selector";
import * as navigation from "../../../util/navigation";
import appIcons from "../../../util/applicationIcons";

function HeaderCart({history}) {
    const itemsNumber = useSelector(itemsNumberSelector);
    const navigateToCart = () => {
        navigation.navigateToCart(history);
    };
    return (
        <div className="header-cart-component" onClick={navigateToCart} title="view your cart" id="viewShoppingCartBtn">
            <img src={appIcons.cartIcon} alt=""/>
            <div className="items-number" id="cartItemsNumber">
                {itemsNumber}
            </div>
        </div>
    )
}

export default withRouter(HeaderCart);
