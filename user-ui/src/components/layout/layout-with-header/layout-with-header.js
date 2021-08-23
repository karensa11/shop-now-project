import React from "react";
import "./layout-with-header.scss";
import Header from "../header/header";

export default function LayoutWithHeader({children}) {
    return (
        <div className="layout-with-header-component">
            <Header />
            <div className="body">
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}