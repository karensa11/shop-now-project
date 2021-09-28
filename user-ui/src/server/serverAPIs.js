const callsHandler = require("./callsHandler");
const config = require("../config");

export function getCategories() {
    return callsHandler.callGET(config.catalogURL, "categories");
}
export function getItemsForCategory(pathParams) {
    return callsHandler.callGET(config.catalogURL, "categories/{categoryId}/items", pathParams);
}
export function createOrder(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "", pathParams, params, orderItemData);
}
export function createOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "{orderId}/item", pathParams, params, orderItemData);
}
export function updateOrderDetails(pathParams, params, orderDetailsData) {
    return callsHandler.callPOST(config.ordersURL, "{orderId}/item/{orderItemId}", pathParams, params, orderDetailsData);
}
export function updateOrderItem(pathParams, params, orderItemData) {
    return callsHandler.callPOST(config.ordersURL, "{orderId}/item/{orderItemId}", pathParams, params, orderItemData);
}
export function cancelOrderItem(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "{orderId}/item/{orderItemId}", pathParams, params);
}
export function cancelOrder(pathParams, params) {
    return callsHandler.callDELETE(config.ordersURL, "{orderId}", pathParams);
}
export function updateDeliveredOn(pathParams, params, deliveredOn) {
    return callsHandler.callPOST(config.ordersURL, "{orderId}/delivery-date", pathParams, {deliveredOn: deliveredOn});
}
export function placeOrder(pathParams, params) {
    return callsHandler.callPOST(config.ordersURL, "{orderId}/place", pathParams);
}
export function getOrderDetails(pathParams) {
    return callsHandler.callGET(config.ordersURL, "{orderId}", pathParams);
}
export function searchItems(pathParams, params) {
    return callsHandler.callGET(config.catalogURL, "items/search", pathParams, params);
}
export function login(pathParams, params, loginData) {
    return callsHandler.callPOST(config.usersURL, "authenticate", pathParams, params, loginData);
}
export function getLoginData(pathParams, params) {
    return callsHandler.callGET(config.usersURL, "{userId}", pathParams, params);
}
export function register(pathParams, params, userData) {
    return callsHandler.callPOST(config.usersURL, "", pathParams, params, userData);
}
export function deleteUser(pathParams, params) {
    return callsHandler.callDELETE(config.usersURL, "{userId}", pathParams, params);
}
export function retrieveCurrentUserOrders(pathParams) {
    return callsHandler.callGET(config.ordersURL, "user/{userId}/not-open", pathParams);
}
export function searchOrder(pathParams, params) {
    return callsHandler.callGET(config.ordersAdminURL, "search", pathParams, params);
}
export function setDeliveredOn(pathParams, params) {
    return callsHandler.callPOST(config.ordersAdminURL, "{orderId}/delivery-date", pathParams, params);
}
export function closeOrder(pathParams, params) {
    return callsHandler.callPOST(config.ordersAdminURL, "{orderId}/close", pathParams, params);
}
