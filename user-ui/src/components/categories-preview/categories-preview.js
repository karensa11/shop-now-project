import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {categoriesSelector} from "../../redux/catalog/catalog-selector";
import "./categories-preview.scss";
import CategoryPreviewItem from "../category-item/category-preview-item";

function CategoriesPreview({categories}) {
    return (
        <div className="categories-preview-component">
            {
                categories && categories.map(item =>
                    <CategoryPreviewItem key={item.id} item={item} />
                )
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categories: categoriesSelector
});

export default connect(mapStateToProps)(CategoriesPreview);
