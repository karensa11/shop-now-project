import React, {useEffect} from 'react';
import './App.css';
import * as actions from "../server/actions";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import CatalogPage from "./pages/catalog-page/catalog-page";
import ShoppingCartPage from "./pages/shopping-cart-page/shopping-cart-page";
import SearchResultsPage from "./pages/search-results-page/search-results-page";
import LoginPage from "./pages/login-page/login-page";
import {currentUserSelector} from "../redux/general/general-selector";
import RegisterPage from "./pages/register-page/register-page";
import AccountPage from "./pages/account-page/account-page";
import AdminRouter from "../components-admin/admin-router";

export default function App(){
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const retrieveCategories = () => {
        dispatch(actions.retrieveCategories());
    };
    useEffect(() => {
        retrieveCategories();
        }, []);
    return (
        <div className="app-component">
            <Switch>
                <Route exact path="/" component={CatalogPage} />
                <Route path="/admin" component={AdminRouter} />
                <Route exact path="/cart" component={ShoppingCartPage}/>
                <Route path={"/search"} component={SearchResultsPage} />
                <Route path={"/signIn"} render={(props) => (
                    currentUser ?
                        <Redirect to="/" /> : <LoginPage {...props} />
                        )} />
                <Route path={"/register"} render={(props) => (
                    currentUser ?
                        <Redirect to="/" /> : <RegisterPage {...props} />
                        )} />
                <Route path={"/account"} render={(props) => (
                    currentUser ?
                        <AccountPage {...props} /> : <Redirect to="/" />
                    )} />
            </Switch>
        </div>
    );
}
