const callsHandler = require("./callsHandler");
const config = require("../config");

export function getCategories() {
    return callsHandler.callGET(config.catalogURL, "catalog/categories");
}
export function getItemsForCategory(pathParams) {
    return callsHandler.callGET(config.catalogURL, "catalog/categories/{categoryId}/items", pathParams);
}
export function createOrder(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders", pathParams, params, orderItemData);
}
export function createOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders/{orderId}/item", pathParams, params, orderItemData);
}
export function updateOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "orders/{orderId}/item/{orderItemId}", pathParams, params, orderItemData);
}
export function cancelOrderItem(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "orders/{orderId}/item/{orderItemId}", pathParams, params);
}
export function cancelOrder(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "orders/{orderId}", pathParams);
}
export function getOrderDetails(pathParams) {
    return callsHandler.callGET(config.ordersURL, "orders/{orderId}", pathParams);
}
export function searchItems(pathParams, params) {
    return callsHandler.callGET(config.catalogURL, "catalog/items/search", pathParams, params);
}
export function login(pathParams, params, loginData) {
    return callsHandler.callPOST(config.usersURL, "users/authenticate", pathParams, params, loginData);
}
export function getLoginData(pathParams, params) {
    return callsHandler.callGET(config.usersURL, "users/{userId}", pathParams, params);
}
export function register(pathParams, params, userData) {
    return callsHandler.callPOST(config.usersURL, "users", pathParams, params, userData);
}
