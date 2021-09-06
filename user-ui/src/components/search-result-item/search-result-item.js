import React from "react";
import "./search-result-item.scss";
import {addItem} from "../../util/orderUtil";
import {useDispatch} from "react-redux";
import Price from "../common/price/price";

export default function SearchResultItem({item, index}) {
    const dispatch = useDispatch();
    const addItemFunc = () => {
        dispatch(addItem(item.id));
    };
    return (
        <div className="search-result-item-component">
            <img src={item.imageUrl} alt="" />
            <div className="content">
                <div className="name" id={`searchResultName${index}Lbl`}>
                    {item.name}
                </div>
                <div className="description">
                    {item.description}
                </div>
                <div className="price">
                    <Price price={item.price} />
                </div>
                <div className="bottom" onClick={addItemFunc}>
                    <div className="add-to-cart" id={`searchResultAddToCart${index}Btn`}>Add to cart</div>
                </div>
            </div>
        </div>
    )
}
