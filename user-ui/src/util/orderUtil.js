import {store} from "../redux/sessionStorage";
import {currentOrderSelector} from "../redux/order/order-selector";
import * as actions from "../server/actions";

export function addItem(catalogId) {
    let currentOrder = currentOrderSelector(store.getState());
    if (!currentOrder) {
        const orderItem = {
            catalogId: catalogId,
            quantity: 1
        }
        return actions.createOrder(orderItem);
    }
    let orderItem = null;
    currentOrder.orderItems.forEach(item => {
        if (item.catalogId === catalogId) {
            orderItem = item;
        }
    });
    if (orderItem) {
        orderItem.quantity++;
        return updateItem(orderItem);
    } else {
        orderItem = {
            catalogId: catalogId,
            quantity: 1
        };
        return actions.createOrderItem(currentOrder.id, orderItem);
    }
}

export function cancelItem(orderItem) {
    const currentOrder = currentOrderSelector(store.getState());
    if (currentOrder.orderItems.length === 1) {
        return actions.cancelOrder(currentOrder.id);
    }
    else {
        return actions.cancelOrderItem(currentOrder.id, orderItem.id);
    }
}

export function decreaseItem(orderItem) {
    if (orderItem.quantity === 1) {
        return cancelItem(orderItem);
    }
    orderItem.quantity--;
    return updateItem(orderItem);
}

export function increaseItem(orderItem) {
    orderItem.quantity++;
    return updateItem(orderItem);
}

function updateItem(orderItem) {
    const currentOrder = currentOrderSelector(store.getState());
    return actions.updateOrderItem(currentOrder.id, orderItem);
}
