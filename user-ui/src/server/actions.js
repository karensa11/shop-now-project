import * as serverAPIs from "./serverAPIs";
import * as catalogActions from "../redux/catalog/catalog-actions";
import * as orderActions from "../redux/order/order-actions";
import * as actionUtils from "./actionsUtils";

export function retrieveCategories() {
    return actionUtils.wrapGet(
        serverAPIs.getCategories,
        catalogActions.setCategories,
        null,
        null,
    )
}

export function retrieveItemsForCategory(categoryId) {
    return actionUtils.wrapGet(
        serverAPIs.getItemsForCategory,
        catalogActions.setCategoryData,
        {categoryId: categoryId},
        null,
    )
}

export function createOrder(orderItemData) {
    return actionUtils.wrapUpdate(
        serverAPIs.createOrder,
        null,
        null,
        orderItemData,
        getOrderDetails
    )
}

export function createOrderItem(orderId, orderItemData) {
    return actionUtils.wrapUpdate(
        serverAPIs.createOrderItem,
        {orderId: orderId},
        null,
        orderItemData,
        getOrderDetails
    )
}

export function updateOrderItem(orderId, orderItemData) {
    return actionUtils.wrapUpdate(
        serverAPIs.updateOrderItem,
        {orderId: orderId, orderItemId: orderItemData.id},
        null,
        orderItemData,
        getOrderDetails
    )
}

export function cancelOrderItem(orderId, orderItemId) {
    return actionUtils.wrapUpdate(
        serverAPIs.cancelOrderItem,
        {orderId: orderId, orderItemId: orderItemId},
        null,
        null,
        getOrderDetails
    )
}

export function cancelOrder(orderId) {
    return actionUtils.wrapUpdate(
        serverAPIs.cancelOrder,
        {orderId: orderId},
        null,
        null,
        orderActions.clearOrder
    )
}

export function getOrderDetails(orderDetails) {
    return getOrderDetailsWithId(orderDetails.id);
}

export function getOrderDetailsWithId(orderId) {
    return actionUtils.wrapGet(
        serverAPIs.getOrderDetails,
        orderActions.setCurrentOrder,
        {orderId: orderId},
        null,
    )
}
