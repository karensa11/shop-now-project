import React from "react";
import "./shopping-cart-page.scss";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import {connect} from "react-redux";
import {currentOrderSelector} from "../../../redux/order/order-selector";
import {createStructuredSelector} from "reselect";
import ShoppingCartItem from "../../shopping-cart-item/shopping-cart-item";
import Price from "../../common/price/price";

function ShoppingCartPage({currentOrder}) {
    return (
        <LayoutWithHeader>
            <div className="shopping-cart-page">
            {
                currentOrder ?
                    <div className="shopping-cart">
                        <div className="title">
                            Your cart
                        </div>
                        <div>
                        {currentOrder.orderItems.map(item =>
                            <ShoppingCartItem item={item} key={item.id} />
                        )}
                        </div>
                        <div className="bottom">
                            Subtotal ({currentOrder.totalItemsNumber} items):&nbsp;
                            <span className="price">
                                <Price price={currentOrder.totalPrice} />
                            </span>
                        </div>
                    </div>
                    :
                    <div>No items in cart</div>
            }
            </div>
        </LayoutWithHeader>
    )
}

const mapStateToProps = createStructuredSelector({
    currentOrder: currentOrderSelector
})

export default connect(mapStateToProps)(ShoppingCartPage);
