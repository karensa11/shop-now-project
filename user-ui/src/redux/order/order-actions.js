import types from "./order-types";

export function setCurrentOrder(orderData) {
    return {
        type: types.SET_CURRENT_ORDER,
        payload: orderData
    }
}
export function clearOrder() {
    return {
        type: types.SET_CURRENT_ORDER,
        payload: null
    }
}
