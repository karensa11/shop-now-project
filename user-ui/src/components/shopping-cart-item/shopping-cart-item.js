import React from "react";
import "./shopping-cart-item.scss";
import {formatPrice} from "../../util/formatter";
import {connect} from "react-redux";
import appIcons from "../../util/applicationIcons";
import * as orderUtil from "../../util/orderUtil";

function ShoppingCartItem({item, cancelItem, increaseItem, decreaseItem}) {
    const {catalogItem} = item;
    const cancelItemFunc = () => {
        cancelItem(item);
    };
    const increaseItemFunc = () => {
        increaseItem(item);
    };
    const decreaseItemFunc = () => {
        decreaseItem(item);
    };
    return (
        <div className="shopping-cart-item-component">
            <img src={catalogItem.imageUrl} alt=""/>
            <div className="content">
                <div className="name">
                    {catalogItem.name}
                </div>
                <div className="description">
                    {catalogItem.description}
                </div>
                <div className="price">
                    {formatPrice(catalogItem.price)}
                </div>
                <div className="buttons">
                    <img src={appIcons.plusIcon} onClick={increaseItemFunc} title="increase quantity" alt="" />
                    <div className="quantity">{item.quantity}</div>
                    <img src={appIcons.minusIcon} onClick={decreaseItemFunc} title="increase quantity" alt="" />
                    <img src={appIcons.trashIcon} onClick={cancelItemFunc} title="remove this cart item" alt="" />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cancelItem: (orderItemData) => dispatch(orderUtil.cancelItem(orderItemData)),
    increaseItem: (orderItemData) => dispatch(orderUtil.increaseItem(orderItemData)),
    decreaseItem: (orderItemData) => dispatch(orderUtil.decreaseItem(orderItemData)),
});

export default connect(null, mapDispatchToProps)(ShoppingCartItem);
