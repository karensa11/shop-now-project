import React from "react";
import "./catalog-item.scss";
import {formatPrice} from "../../util/formatter";
import {connect} from "react-redux";
import {addItem} from "../../util/orderUtil";

function CatalogItem({item, addItem}) {
    return (
        <div className="catalog-item-component">
            <div className="name">
                {item.name}
            </div>
            <div className="image">
                <img alt="" src={item.imageUrl}/>
            </div>
            <div className="description">
                {item.description}
            </div>
            <div className="price">
                {formatPrice(item.price)}
            </div>
            <div className="bottom" onClick={addItem}>
                <div className="add-to-cart">Add to cart</div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addItem: () => dispatch(addItem(ownProps.item.id))
});

export default connect(null, mapDispatchToProps)(CatalogItem);
