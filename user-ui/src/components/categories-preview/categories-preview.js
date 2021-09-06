import React from "react";
import {useSelector} from "react-redux";
import {categoriesSelector} from "../../redux/catalog/catalog-selector";
import "./categories-preview.scss";
import CategoryPreviewItem from "../category-item/category-preview-item";

export default function CategoriesPreview() {
    const categories = useSelector(categoriesSelector);
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
