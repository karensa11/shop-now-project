import React, {useEffect} from 'react';
import './App.css';
import * as actions from "../server/actions";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import {currentUserSelector} from "../redux/general/general-selector";
import AdminRouter from "../components-admin/admin-router";
import RegularRouter from "./regular-router";
import config from "../config";

export default function App(){
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const retrieveCategories = () => {
        dispatch(actions.retrieveCategories());
    };
    const retrieveUser = () => {
        if (currentUser == null) {
            dispatch(actions.login({email: config.guestUserEmail, passwordPartial: config.guestUserPass}));
        }
    };
    useEffect(() => {
        retrieveCategories();
        retrieveUser();
        }, []);
    return (
        <div className="app-component">
            <Switch>
                <Route path="/admin" render={(props) => (
                    !currentUser || !currentUser.isAdmin ?
                        <Redirect to="/"/> : <AdminRouter {...props} />
                    )} />
                <Route path="/" render={(props) => (
                    currentUser && currentUser.isAdmin ?
                        <Redirect to="/admin"/> : <RegularRouter {...props} />
                )} />
            </Switch>
        </div>
    );
}
