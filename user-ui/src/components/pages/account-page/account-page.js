import React from "react";
import "./account-page.scss";
import LayoutLogin from "../../layout/layout-login/layout-login";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {currentUserSelector} from "../../../redux/general/general-selector";
import LabelSection from "../../common/label-section/label-section";
import Button from "../../common/button/button";
import {deleteUser} from "../../../server/actions";

function AccountPage({currentUser, deleteUser}) {
    const deleteUserFunc = () => {
        deleteUser(currentUser.id);
    };
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
                <div className="section">
                    <Button title="Delete Account" id="deleteAccountBtn" onClick={deleteUserFunc} />
                </div>
            </div>
        </LayoutLogin>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (userId) => dispatch(deleteUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
