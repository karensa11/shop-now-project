import React from "react";
import "./shopping-cart-page.scss";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import {useSelector} from "react-redux";
import {currentOrderSelector} from "../../../redux/order/order-selector";
import ShoppingCartItem from "../../shopping-cart-item/shopping-cart-item";
import Price from "../../common/price/price";

export default function ShoppingCartPage() {
    const currentOrder = useSelector(currentOrderSelector);
    return (
        <LayoutWithHeader>
            <div className="shopping-cart-page">
            {
                currentOrder ?
                    <div className="shopping-cart">
                        <div className="title" id="shoppingCartLbl">
                            Your cart
                        </div>
                        <div>
                        {currentOrder.orderItems.map((item, index) =>
                            <ShoppingCartItem item={item} key={item.id} index={index} />
                        )}
                        </div>
                        <div className="bottom">
                            Subtotal (<span id="shoppingCartItemsNumberLbl">{currentOrder.totalItemsNumber}</span> items):&nbsp;
                            <span className="price">
                                <Price price={currentOrder.totalPrice} />
                            </span>
                        </div>
                    </div>
                    :
                    <div id="noItemsLbl">No items in cart</div>
            }
            </div>
        </LayoutWithHeader>
    )
}
