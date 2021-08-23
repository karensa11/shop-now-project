import React from "react";
import "./search-result-item.scss";
import {addItem} from "../../util/orderUtil";
import {connect} from "react-redux";
import Price from "../common/price/price";

function SearchResultItem({item, addItem}) {
    return (
        <div className="search-result-item-component">
            <img src={item.imageUrl} alt="" />
            <div className="content">
                <div className="name">
                    {item.name}
                </div>
                <div className="description">
                    {item.description}
                </div>
                <div className="price">
                    <Price price={item.price} />
                </div>
                <div className="bottom" onClick={addItem}>
                    <div className="add-to-cart">Add to cart</div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addItem: () => dispatch(addItem(ownProps.item.id))
});

export default connect(null, mapDispatchToProps)(SearchResultItem);
