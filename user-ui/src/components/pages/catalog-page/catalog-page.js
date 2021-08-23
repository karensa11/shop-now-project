import React from "react";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import CategoriesPreview from "../../categories-preview/categories-preview";
import CatalogItems from "../../catalog-items/catalog-items";
import "./catalog-page.scss";

export default function CatalogPage() {
    return (
        <LayoutWithHeader>
            <CategoriesPreview />
            <hr />
            <CatalogItems />
        </LayoutWithHeader>
    )
}
