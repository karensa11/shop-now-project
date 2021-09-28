import {createSelector} from "reselect";

const adminSelector = (state) => state.adminNs;

export const currentOrderSelector = createSelector(
    adminSelector,
    slice => slice.currentOrder
);
