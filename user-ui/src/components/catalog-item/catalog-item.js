import React from "react";
import "./catalog-item.scss";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {addItem} from "../../util/orderUtil";
import Price from "../common/price/price";

export default function CatalogItem({item}) {
    const dispatch = useDispatch();
    const addItemFunc = () => {
        dispatch(addItem(item.id));
    };
    return (
        <div className="catalog-item-component">
            <div className="name" id={`catalogItemName${item.id}Lbl`}>
                {item.name}
            </div>
            <div className="image">
                <img alt="" src={item.imageUrl}/>
            </div>
            <div className="description">
                {item.description}
            </div>
            <div className="price">
                <Price price={item.price} />
            </div>
            <div className="bottom" onClick={addItemFunc}>
                <div className="add-to-cart" id={`addToCart${item.id}Btn`}>Add to cart</div>
            </div>
        </div>
    )
}
CatalogItem.propTypes = {
    item: PropTypes.object
};