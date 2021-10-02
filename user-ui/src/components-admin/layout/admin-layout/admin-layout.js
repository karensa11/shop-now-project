import React from "react";
import "./admin-layout.scss";
import {useHistory} from "react-router-dom";
import AdminHeader from "../admin-header/admin-header";
import Button from "../../../components/common/button/button";
import {navigateToHandleOrders, navigateToTransactions} from "../../../util/adminNavigation";

export default function AdminLayout({children}) {
    const history = useHistory();
    const navigateToHandleOrdersFunc = () => {
        navigateToHandleOrders(history);
    };
    const navigateToTransactionsFunc = () => {
        navigateToTransactions(history);
    };
    return (
        <div className="admin-layout-component">
            <div className="admin-layout-component">
                <AdminHeader />
                <div className="content">
                    <div className="links">
                        <Button title="Handle Order" id="handleOrderBtn" onClick={navigateToHandleOrdersFunc} />
                        <Button title="View Transactions" id="viewTransactionsBtn" onClick={navigateToTransactionsFunc} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}