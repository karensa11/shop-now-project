import React from "react";
import "./account-order-history.scss";
import {useSelector} from "react-redux";
import {currentUserOrdersSelector} from "../../redux/general/general-selector";
import AccountOrderHistoryItem from "../account-order-history-item/account-order-history-item";

export default function AccountOrderHistory() {
    const currentOrders = useSelector(currentUserOrdersSelector);
    return (
        <div className="account-order-history-component">
            <div className="orders-title">Your Orders</div>
            <div>
                {currentOrders && currentOrders.length ?
                    currentOrders.map((item, index) => (
                        <AccountOrderHistoryItem key={item.id} index={index} item={item} />
                    )) :
                    <div>No Orders To Show</div>
                }
            </div>
        </div>
    )
}
