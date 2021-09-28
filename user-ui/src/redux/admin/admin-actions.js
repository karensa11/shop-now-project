import types from "./admin-types";

export function setCurrentOrder(order) {
    return {
        payload: order,
        type: types.SET_CURRENT_ADMIN_ORDER
    }
}
