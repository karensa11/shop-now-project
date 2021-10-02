import React from "react";
import {Switch, Route} from "react-router-dom";
import TransactionsPage from "./pages/transactions-page/transactions-page";
import HandleOrderPage from "./pages/handle-order-page/handle-order-page";
import HomePage from "./pages/home-page/home-page";

export default function AdminRouter({match}) {
    return (
        <Switch>
            <Route exact path={`${match.path}`} component={HomePage}/>
            <Route path={`${match.path}/handle-orders`} component={HandleOrderPage}/>
            <Route path={`${match.path}/transactions`} component={TransactionsPage} />
        </Switch>
    )
};
