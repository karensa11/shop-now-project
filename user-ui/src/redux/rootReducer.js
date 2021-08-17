import {combineReducers} from "redux";
import catalogNs from "./catalog/catalog-reducer";
import generalNs from "./general/general-reducer";
import orderNs from "./order/order-reducer";

export default combineReducers({
    catalogNs,
    generalNs,
    orderNs
})
