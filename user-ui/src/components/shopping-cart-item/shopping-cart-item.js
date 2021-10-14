import React from "react";
import "./shopping-cart-item.scss";
import {formatPrice} from "../../util/formatter";
import {useDispatch} from "react-redux";
import appIcons from "../../util/applicationIcons";
import * as orderUtil from "../../util/orderUtil";

export default function ShoppingCartItem({item, index}) {
    const dispatch = useDispatch();
    const cancelItem = () => {
        dispatch(orderUtil.cancelItem(item));
    };
    const increaseItem = () => {
        dispatch(orderUtil.increaseItem(item));
    };
    const decreaseItem = () => {
        dispatch(orderUtil.decreaseItem(item));
    };
    const {catalogItem} = item;
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
                    {formatPrice(item.itemPrice)}
                </div>
                <div className="buttons">
                    <img src={appIcons.plusIcon} onClick={increaseItem} title="increase quantity" alt="" id={`increase${index}Btn`} />
                    <div className="quantity">{item.quantity}</div>
                    <img src={appIcons.minusIcon} onClick={decreaseItem} title="increase quantity" alt="" id={`decrease${index}Btn`} />
                    <img src={appIcons.trashIcon} onClick={cancelItem} title="remove this cart item" alt=""  id={`remove${index}Btn`} />
                </div>
            </div>
        </div>
    )
}
