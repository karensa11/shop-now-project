import React, {useState} from "react";
import "./transactions-page.scss";
import AdminLayout from "../../layout/admin-layout/admin-layout";
import TextInput from "../../../components/common/text-input/text-input";
import {INPUT_TYPES} from "../../../components/common/text-input/text-input-types";
import Button from "../../../components/common/button/button";
import * as actions from "../../../server/adminActions";
import {useDispatch, useSelector} from "react-redux";
import {currentNotificationsSelector} from "../../../redux/admin/admin-selector";
import NotificationItem from "../../notification-item/notification-item";

export default function TransactionsPage() {
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const currentNotifications = useSelector(currentNotificationsSelector);
    const emailNotFound = () => {
        alert("Email not found");
    };
    const emailFound = (userDetails) => {
        dispatch(actions.searchNotifications(userDetails.id));
    };
    const searchNotifications = () => {
        dispatch(actions.searchByEmail(email, emailNotFound, emailFound));
    };
    return (
        <AdminLayout>
            <div className="transactions-page">
                <TextInput title="Insert email to search notifications for" id="emailSearchInput" onChange={setEmail}
                           type={INPUT_TYPES.EMAIL} />
                <Button title="search" onClick={searchNotifications} id="searchNotificationAdminBtn" />
                <div className="notifications">
                    <table>
                        <tr className="notification-item">
                            <th className="left title">
                                ID
                            </th>
                            <th className="right title">
                                MESSAGE
                            </th>
                        </tr>
                        {currentNotifications && currentNotifications.map((item, index) => (
                            <NotificationItem item={item} index={index} key={item.id} />
                        ))}
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}
