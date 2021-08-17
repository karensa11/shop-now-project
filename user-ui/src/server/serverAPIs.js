const callsHandler = require("./callsHandler");
const config = require("../config");

export function getCategories() {
    return callsHandler.callGET(config.catalogURL, "catalog/categories");
}
export function getItemsForCategory(pathParams) {
    return callsHandler.callGET(config.catalogURL, "catalog/categories/{categoryId}/items", pathParams);
}
export function createOrder(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders", null, null, orderItemData);
}
export function createOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders/{orderId}/item", pathParams, null, orderItemData);
}
export function updateOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders/{orderId}/item/{orderItemId}", pathParams, null, orderItemData);
}
export function cancelOrderItem(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "orders/{orderId}/item/{orderItemId}", pathParams, null);
}
export function cancelOrder(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "orders/{orderId}", pathParams, null);
}
export function getOrderDetails(pathParams) {
    return callsHandler.callGET(config.ordersURL, "orders/{orderId}", pathParams);
}
