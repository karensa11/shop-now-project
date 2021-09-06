import React from "react";
import "./category-preview-item.scss";
import {retrieveItemsForCategory} from "../../server/actions";
import {useDispatch} from "react-redux";

export default function CategoryPreviewItem({item}) {
    const dispatch = useDispatch();
    const fetchCategoryItems = () => {
        dispatch(retrieveItemsForCategory(item.id));
    };
    return (
        <div className="category-preview-item-component" key={item.id} onClick={fetchCategoryItems} id={`category${item.id}Btn`}>
            {item.name}
        </div>
    )
}
