import React, {useEffect} from 'react';
import './App.css';
import * as actions from "../server/actions";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import {currentUserSelector} from "../redux/general/general-selector";
import AdminRouter from "../components-admin/admin-router";
import RegularRouter from "./regular-router";

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
