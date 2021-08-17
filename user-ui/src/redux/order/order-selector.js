import {createSelector} from "reselect";

const orderSelector = (state) => state.orderNs;

export const currentOrderSelector = createSelector(
    [orderSelector],
    orderSelector => orderSelector.currentOrder
);

export const itemsNumberSelector = createSelector(
    [orderSelector],
    orderSelector => {
        let itemsNumber = 0;
        if (orderSelector.currentOrder) {
            const order = orderSelector.currentOrder;
            order.orderItems.forEach(item => {
                itemsNumber += item.quantity;
            })
        }
        return itemsNumber;
    }
)
