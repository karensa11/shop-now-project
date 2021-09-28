import React from "react";
import "./shopping-cart-page.scss";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import {useSelector, useDispatch} from "react-redux";
import {currentOrderSelector} from "../../../redux/order/order-selector";
import ShoppingCartItem from "../../shopping-cart-item/shopping-cart-item";
import Price from "../../common/price/price";
import Button from "../../common/button/button";
import {cancelOrder, placeOrder} from "../../../server/actions";
import * as orderActions from "../../../redux/order/order-actions";
import {currentUserSelector} from "../../../redux/general/general-selector";

export default function ShoppingCartPage() {
    const currentOrder = useSelector(currentOrderSelector);
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const cancelOrderFunc = () => {
        dispatch(cancelOrder(currentOrder.id));
    };
    const placeOrderSuccessFunc = () => {
        alert("Your order placed with success");
        dispatch(orderActions.clearOrder());
    };
    const placeOrderFunc = () => {
        dispatch(placeOrder(currentOrder.id, placeOrderSuccessFunc));
    };
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
                            <div className="item">
                                Subtotal (<span id="shoppingCartItemsNumberLbl">{currentOrder.totalItemsNumber}</span> items):&nbsp;
                                <span className="price">
                                    <Price price={currentOrder.totalPrice} />
                                </span>
                            </div>
                            <Button title="Cancel Order" onClick={cancelOrderFunc} id="cancelOrderBtn" />
                            {currentUser &&
                                <Button title="Place Order" onClick={placeOrderFunc} id="placeOrderBtn"/>
                            }
                        </div>
                    </div>
                    :
                    <div id="noItemsLbl">No items in cart</div>
            }
            </div>
        </LayoutWithHeader>
    )
}
