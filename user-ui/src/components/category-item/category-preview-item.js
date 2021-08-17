import React from "react";
import "./category-preview-item.scss";
import {retrieveItemsForCategory} from "../../server/actions";
import {connect} from "react-redux";

function CategoryPreviewItem({item, fetchCategoryItems}) {
    const itemClick = () => {
        fetchCategoryItems(item.id);
    };
    return (
        <div className="category-preview-item-component" key={item.id} onClick={itemClick}>
            {item.name}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchCategoryItems: (categoryId) => dispatch(retrieveItemsForCategory(categoryId))
});

export default connect(null, mapDispatchToProps)(CategoryPreviewItem);
