import React, {useState} from "react";
import "./handle-order-page.scss";
import {useDispatch, useSelector} from "react-redux";
import AdminLayout from "../../layout/admin-layout/admin-layout";
import TextInput from "../../../components/common/text-input/text-input";
import {INPUT_TYPES} from "../../../components/common/text-input/text-input-types";
import Button from "../../../components/common/button/button";
import * as actions from "../../../server/adminActions";
import {currentOrdersSelector} from "../../../redux/admin/admin-selector";
import AdminOrderItem from "../../admin-order-item/admin-order-item";

export default function HandleOrderPage() {
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const currentOrders = useSelector(currentOrdersSelector);
    const emailNotFound = () => {
        alert("Email not found");
    };
    const emailFound = (userDetails) => {
        dispatch(actions.searchOrder(userDetails.id));
    };
    const searchOrder = () => {
        dispatch(actions.searchByEmail(email, emailNotFound, emailFound));
    };
    return (
        <AdminLayout>
            <div className="handle-order-page">
                <TextInput title="Insert email to search orders for" id="emailSearchInput" onChange={setEmail} type={INPUT_TYPES.EMAIL} />
                <Button title="search" onClick={searchOrder} id="searchOrderAdminBtn" />
                {currentOrders && currentOrders.map((item, index) => (
                    <AdminOrderItem item={item} index={index} key={item.id} />
                ))}
            </div>
        </AdminLayout>
    )
}
