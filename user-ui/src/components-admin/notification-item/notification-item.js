import React from "react";
import "./notification-item.scss";
import PropTypes from "prop-types";

export default function NotificationItem({item, index}) {
    return (
        <tr className="notification-item-component">
            <td className="left">
                {item.id}
            </td>
            <td className="right" id={`notificationMessage${index}Lbl`}>
                {item.message}
            </td>
        </tr>
    )
}
NotificationItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
};
