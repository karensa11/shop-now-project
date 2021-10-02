import React, {useEffect} from "react";
import "./account-page.scss";
import LayoutLogin from "../../layout/layout-login/layout-login";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../../../redux/general/general-selector";
import LabelSection from "../../common/label-section/label-section";
import Button from "../../common/button/button";
import * as actions from "../../../server/actions";
import AccountOrderHistory from "../../account-order-history/account-order-history";
import * as generalActions from "../../../redux/general/general-actions";
import * as orderActions from "../../../redux/order/order-actions";
import config from "../../../config";

export default function AccountPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(currentUserSelector);
    const deleteUserFunc = () => {
        if (window.confirm("please confirm deletion")) {
            dispatch(actions.deleteUser(currentUser.id));
            dispatch(orderActions.clearOrder());
            dispatch(actions.login({email: config.guestUserEmail, passwordPartial: config.guestUserPass}));
        }
    };
    const logoutFunc = () => {
        dispatch(generalActions.logout());
        dispatch(orderActions.clearOrder());
        dispatch(actions.login({email: config.guestUserEmail, passwordPartial: config.guestUserPass}));
    };
    useEffect(() => {
        dispatch(actions.getUserOrders(currentUser.id));
    }, []);
    return (
        <LayoutLogin>
            <div className="account-page">
                <div className="section">
                    <LabelSection text="Your name" customClass="title" />
                    <LabelSection text={currentUser.name} id="nameLbl" />
                </div>
                <div className="section">
                    <LabelSection text="Your email" customClass="title" />
                    <LabelSection text={currentUser.email} id="emailLbl" />
                </div>
                <div className="buttons">
                    <Button title="Logout" id="logoutBtn" onClick={logoutFunc} />
                    <Button title="Delete Account" id="deleteAccountBtn" onClick={deleteUserFunc} />
                </div>
            </div>
            <AccountOrderHistory />
        </LayoutLogin>
    )
}
