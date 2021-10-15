import React from "react";
import PropTypes from "prop-types";
import "./admin-order-item.scss";
import {formatPrice} from "../../util/formatter";
import Button from "../../components/common/button/button";
import {useDispatch} from "react-redux";
import {searchOrder, setDeliveredOn} from "../../server/adminActions";

export default function AdminOrderItem({item, index}) {
    const dispatch = useDispatch();
    const updateOrderFunc = () => {
        dispatch(searchOrder(item.id));
    };
    const setDeliveredOnFunc = () => {
        dispatch(setDeliveredOn(item.id, updateOrderFunc));
    };
    return (
        <div className="admin-order-item-component">
            <div className="order-details-title">
                <div className="title-item">Order Id: {item.id}</div>
                <div className="title-item">Status: {item.status}</div>
                <div className="title-item">Total: {formatPrice(item.totalPrice)}</div>
                {item.deliveredOn &&
                    <div className="title-item">Delivered On: {item.deliveredOn}</div>
                }
                {!item.deliveredOn &&
                    <Button title="Set Delivered On" id={`setDeliveredOn${index}Btn`} onClick={setDeliveredOnFunc} />
                }
            </div>
            <div>
                {item.orderItems && item.orderItems.length &&
                item.orderItems.map((orderItem) => {
                    const {catalogItem} = orderItem;
                    return (
                        <div className="order-item-details" key={orderItem.id}>
                            <img src={catalogItem.imageUrl} alt="" />
                            <div className="item-details">
                                <div>
                                    <span className="item-name">{catalogItem.name}</span>&nbsp;
                                    {catalogItem.description}
                                </div>
                                <div>Quantity: <span>{orderItem.quantity}</span></div>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}
AdminOrderItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
};
