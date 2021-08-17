import React from "react";
import "./shopping-cart-page.scss";
import CommonLayout from "../../layout/common-layout/common-layout";
import {connect} from "react-redux";
import {currentOrderSelector} from "../../../redux/order/order-selector";
import {createStructuredSelector} from "reselect";
import ShoppingCartItem from "../../shopping-cart-item/shopping-cart-item";
import {formatPrice} from "../../../util/formatter";

function ShoppingCartPage({currentOrder}) {
    return (
        <CommonLayout>
            <div className="shopping-cart-page">
            {
                currentOrder ?
                    <div className="shopping-cart">
                        <div className="title">SHOPPING CART</div>
                        <div>
                        {currentOrder.orderItems.map(item =>
                            <ShoppingCartItem item={item} key={item.id} />
                        )}
                        </div>
                        <div className="total-price">
                            Total: {formatPrice(currentOrder.totalPrice)}
                        </div>
                    </div>
                    :
                    <div>No items in cart</div>

            }
            </div>
        </CommonLayout>
    )
}

const mapStateToProps = createStructuredSelector({
    currentOrder: currentOrderSelector
})

export default connect(mapStateToProps)(ShoppingCartPage);
