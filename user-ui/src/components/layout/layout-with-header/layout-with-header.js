import React from "react";
import "./layout-with-header.scss";
import Logo from "../logo/logo";
import SearchBox from "../search-box/search-box";
import HeaderUser from "../header-user/header-user";
import HeaderCart from "../header-cart/header-cart";

export default function LayoutWithHeader({children}) {
    return (
        <div className="layout-with-header-component">
            <div className="header">
                <div className="left">
                    <Logo />
                </div>
                <SearchBox />
                <div className="right">
                    <HeaderUser />
                    <HeaderCart />
                </div>
            </div>
            <div className="body">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}