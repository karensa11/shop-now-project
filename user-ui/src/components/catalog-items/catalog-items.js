import React from "react";
import {connect} from "react-redux";
import {categoryItemsSelector} from "../../redux/catalog/catalog-selector";
import {createStructuredSelector} from "reselect";
import "./catalog-items.scss";
import CatalogItem from "../catalog-item/catalog-item";

function CatalogItems({categoryId, categoryItems}) {
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

const mapStateToProps = createStructuredSelector({
    categoryItems: categoryItemsSelector
});

export default connect(mapStateToProps)(CatalogItems);
