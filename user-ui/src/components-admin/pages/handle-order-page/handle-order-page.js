import React, {useState} from "react";
import "./handle-order-page.scss";
import {useDispatch, useSelector} from "react-redux";
import AdminLayout from "../../layout/admin-layout/admin-layout";
import TextInput from "../../../components/common/text-input/text-input";
import {INPUT_TYPES} from "../../../components/common/text-input/text-input-types";
import Button from "../../../components/common/button/button";
import * as actions from "../../../server/adminActions";
import {currentOrderSelector} from "../../../redux/admin/admin-selector";
import AdminOrderItem from "../../admin-order-item/admin-order-item";

export default function HandleOrderPage() {
    const [orderNumber, setOrderNumber] = useState();
    const dispatch = useDispatch();
    const currentOrder = useSelector(currentOrderSelector);
    const {catalogItem} = currentOrder || {};
    const onOrderNotFound = () => {
        alert("Order with id " + orderNumber + " not found");
    };
    const searchOrder = () => {
        dispatch(actions.searchOrder(orderNumber, onOrderNotFound));
    };
    return (
        <AdminLayout>
            <div className="handle-order-page">
                <TextInput title="Insert order number to search" onChange={setOrderNumber} type={INPUT_TYPES.NUMBER} />
                <Button title="search" onClick={searchOrder} />
                {currentOrder &&
                    <AdminOrderItem item={currentOrder} />
                }
            </div>
        </AdminLayout>
    )
}
