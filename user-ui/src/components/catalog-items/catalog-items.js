import React from "react";
import {useSelector} from "react-redux";
import {categoryItemsSelector} from "../../redux/catalog/catalog-selector";
import "./catalog-items.scss";
import CatalogItem from "../catalog-item/catalog-item";

function CatalogItems({categoryId}) {
    const categoryItems = useSelector(categoryItemsSelector);
    return (
        <div className="catalog-items-component">
            {
                categoryItems && categoryItems.map(item => (
                    <CatalogItem key={item.id} item={item} />
                ))
            }
        </div>
    )
}

export default CatalogItems;
