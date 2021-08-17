import React from "react";
import "./common-layout.scss";
import Header from "../header/header";

export default function CommonLayout({children}) {
    return (
        <div className="common-layout-component">
            <Header />
            <div className="body">
                {children}
            </div>
        </div>
    )
}