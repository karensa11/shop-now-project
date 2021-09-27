import {createSelector} from "reselect";

const orderSelector = (state) => state.orderNs;

export const currentOrderSelector = createSelector(
    orderSelector,
    slice => slice.currentOrder
);

export const itemsNumberSelector = createSelector(
    orderSelector,
    slice => {
        let itemsNumber = 0;
        if (slice.currentOrder) {
            const order = slice.currentOrder;
            order.orderItems.forEach(item => {
                itemsNumber += item.quantity;
            })
        }
        return itemsNumber;
    }
);
