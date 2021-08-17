import React from "react";
import "./header.scss";
import HeaderCart from "../header-cart/header-cart";
import Logo from "../logo/logo";
import SearchBox from "../search-box/search-box";

export default function Header() {
    return (
        <div className="header-component">
            <div className="left">
                <Logo />
            </div>
            <SearchBox />
            <div className="right">
                <HeaderCart />
            </div>
        </div>
    )
}
