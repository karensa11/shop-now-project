import * as serverAPIs from "./serverAPIs";
import * as catalogActions from "../redux/catalog/catalog-actions";
import * as orderActions from "../redux/order/order-actions";
import * as generalActions from "../redux/general/general-actions";
import * as actionUtils from "./actionsUtils";

export function retrieveCategories() {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.getCategories,
        actionsCreator: catalogActions.setCategories
    })
}

export function retrieveItemsForCategory(categoryId) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.getItemsForCategory,
        actionsCreator: catalogActions.setCategoryData,
        pathParams: {categoryId: categoryId}
    })
}

export function createOrder(orderItemData) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.createOrder,
        body: orderItemData,
        onSuccess: getOrderDetails
    })
}

export function createOrderItem(orderId, orderItemData) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.createOrderItem,
        pathParams: {orderId: orderId},
        body: orderItemData,
        onSuccess: getOrderDetails
    })
}

export function updateOrderItem(orderId, orderItemData) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.updateOrderItem,
        pathParams: {orderId: orderId, orderItemId: orderItemData.id},
        body: orderItemData,
        onSuccess: getOrderDetails
    })
}

export function cancelOrderItem(orderId, orderItemId) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.cancelOrderItem,
        pathParams: {orderId: orderId, orderItemId: orderItemId},
        onSuccess: getOrderDetails
    })
}

export function cancelOrder(orderId) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.cancelOrder,
        pathParams: {orderId: orderId},
        onSuccess: orderActions.clearOrder
    })
}

export function placeOrder(orderId, onSuccess) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.placeOrder,
        pathParams: {orderId: orderId},
        onSuccess: onSuccess
    })
}

export function getOrderDetails(orderDetails) {
    return getOrderDetailsWithId(orderDetails.id);
}

export function getOrderDetailsWithId(orderId) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.getOrderDetails,
        actionsCreator: orderActions.setCurrentOrder,
        pathParams: {orderId: orderId},
    })
}

export function associateUserToOrder(orderId) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.associateUserToOrder,
        pathParams: {orderId: orderId},
        onSuccess: getOrderDetails
    })
}

export function searchItems(searchString) {
    if (!searchString || searchString === "") {
        return (dispatch) => {
            dispatch(catalogActions.setSearchResults([]));
        }
    }
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.searchItems,
        actionsCreator: catalogActions.setSearchResults,
        params: {searchString: searchString}
    })
}

export function login(loginData, onNotFound, onSuccess) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.login,
        body: loginData,
        actionsCreator: generalActions.login,
        onSuccess: onSuccess,
        onNotFound: onNotFound
    })
}

export function register(userData, onConflict, onFailure, onSuccess) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.register,
        actionsCreator: generalActions.login,
        onFailure: onFailure,
        onConflict: onConflict,
        onSuccess: onSuccess,
        body: userData
    })
}

export function deleteUser() {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.deleteUser,
        onSuccess: [orderActions.clearOrder, generalActions.logout]
    })
}

export function getUserOrders() {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.retrieveCurrentUserOrders,
        actionsCreator: generalActions.setCurrentUserOrders
    })
}
