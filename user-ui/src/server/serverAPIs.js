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
    return callsHandler.callPOST(config.usersGuestURL, "authenticate", pathParams, params, loginData);
}
export function getLoginData(pathParams, params) {
    return callsHandler.callGET(config.usersURL, "{userId}", pathParams, params);
}
export function register(pathParams, params, userData) {
    return callsHandler.callPOST(config.usersGuestURL, "", pathParams, params, userData);
}
export function deleteUser(pathParams, params) {
    return callsHandler.callDELETE(config.usersURL, "", pathParams, params);
}
export function retrieveCurrentUserOrders(pathParams) {
    return callsHandler.callGET(config.ordersURL, "user/not-open", pathParams);
}
export function searchUserByEmail(pathParams, params) {
    return callsHandler.callGET(config.usersAdminURL, "search-by-email", pathParams, params);
}
export function searchNotifications(pathParams, params) {
    return callsHandler.callGET(config.trackingAdminURL, "userId/{userId}", pathParams, params);
}
export function searchPlacedOrders(pathParams, params) {
    return callsHandler.callGET(config.ordersAdminURL, "{userId}/search-placed", pathParams, params);
}
export function setDeliveredOn(pathParams, params) {
    return callsHandler.callPOST(config.ordersAdminURL, "{orderId}/delivery-date", pathParams, params);
}
