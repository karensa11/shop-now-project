import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CatalogPage from "./pages/catalog-page/catalog-page";
import ShoppingCartPage from "./pages/shopping-cart-page/shopping-cart-page";
import SearchResultsPage from "./pages/search-results-page/search-results-page";
import LoginPage from "./pages/login-page/login-page";
import RegisterPage from "./pages/register-page/register-page";
import AccountPage from "./pages/account-page/account-page";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../redux/general/general-selector";

export default function RegularRouter({match}) {
    const currentUser = useSelector(currentUserSelector);
    console.log("RegularRouter", match);
    return (
        <Switch>
            <Route exact path={`${match.path}`} component={CatalogPage} />
            <Route exact path={`${match.path}cart`} component={ShoppingCartPage}/>
            <Route path={`${match.path}search`} component={SearchResultsPage} />
            <Route path={`${match.path}signIn`} render={(props) => (
                currentUser ?
                    <Redirect to="/" /> : <LoginPage {...props} />
            )} />
            <Route path={`${match.path}register`} render={(props) => (
                currentUser ?
                    <Redirect to="/" /> : <RegisterPage {...props} />
            )} />
            <Route path={`${match.path}account`} render={(props) => (
                currentUser ?
                    <AccountPage {...props} /> : <Redirect to="/" />
            )} />
        </Switch>
    )
};