import React from "react";
import "./admin-header.scss";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {currentUserSelector} from "../../../redux/general/general-selector";
import Button from "../../../components/common/button/button";
import {navigateToHomePage} from "../../../util/adminNavigation";
import * as generalActions from "../../../redux/general/general-actions";
import * as adminActions from "../../../redux/admin/admin-actions";

export default function AdminHeader() {
    const currentUser = useSelector(currentUserSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const navigateToHomePageFunc = () => {
        navigateToHomePage(history);
    };
    const logoutFunc = () => {
        dispatch(adminActions.clearDara());
        dispatch(generalActions.logout());
    };
    return (
        <div className="admin-header-component">
            <Button customClass="admin-button" title="Shop Now Admin Managemant System"
                    onClick={navigateToHomePageFunc} />
            <div className="right">
                <div className="name" id="adminNameLbl">{currentUser.name}</div>
                <Button title="logout" onClick={logoutFunc} id="adminLogoutBtn" />
            </div>
        </div>
    )
}