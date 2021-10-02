import React from "react";
import "./account-order-history-item.scss";
import {formatPrice} from "../../util/formatter";

export default function AccountOrderHistoryItem({item, index}) {
    return (
        <div className="account-order-history-item-component">
            <div className="order-details-title">
                <span className="title-item">Order Id: {item.id}</span>|
                <span className="title-item">
                    Status: <span id={`orderStatus${index}Lbl`}>{item.status}</span>
                </span>|
                <span className="title-item">Total: {formatPrice(item.totalPrice)}</span>
            </div>
            <div>
                {item.orderItems && item.orderItems.length &&
                    item.orderItems.map((orderItem, index2) => {
                        const {catalogItem} = orderItem;
                        return (
                        <div className="order-item-details" key={orderItem.id}>
                            <img src={catalogItem.imageUrl} alt="" />
                            <div className="item-details">
                                <div>
                                    <span className="item-name" id={`itemName${index}${index2}Lbl`}>{catalogItem.name}</span>&nbsp;
                                    {catalogItem.description}
                                </div>
                                <div>Quantity: <span id={`itemQuantity${index}${index2}Lbl`}>{orderItem.quantity}</span></div>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}