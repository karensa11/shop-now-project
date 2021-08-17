import React from "react";
import CommonLayout from "../../layout/common-layout/common-layout";
import CategoriesPreview from "../../categories-preview/categories-preview";
import CatalogItems from "../../catalog-items/catalog-items";
import "./catalog-page.scss";

export default function CatalogPage() {
    return (
        <CommonLayout>
            <CategoriesPreview />
            <hr />
            <CatalogItems />
        </CommonLayout>
    )
}
