import React from "react";
import "./admin-router.scss";
import {Switch, Route} from "react-router-dom";
import TransactionsPage from "./pages/transactions-page/transactions-page";

export default function AdminRouter({match}) {
    return (
        <div className="admin-router-component">
            <Switch>
                <Route path={`${match.path}/transactions`} component={TransactionsPage} />
            </Switch>
        </div>
    )
};
