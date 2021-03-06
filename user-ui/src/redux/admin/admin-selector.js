import {createSelector} from "reselect";

const adminSelector = (state) => state.adminNs;

export const currentOrdersSelector = createSelector(
    adminSelector,
    slice => slice.currentOrders
);

export const currentNotificationsSelector = createSelector(
    adminSelector,
    slice => slice.currentNotifications
);
