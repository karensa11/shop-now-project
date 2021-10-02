import types from "./admin-types";

export function setCurrentOrders(orders) {
    return {
        payload: orders,
        type: types.SET_CURRENT_ADMIN_ORDERS
    }
}
export function clearDara() {
    return {
        type: types.CLEAR_ADMIN_DATA
    }
}
