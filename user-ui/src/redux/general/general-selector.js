import {createSelector} from "reselect";

const generalSelector = (state) => state.generalNs;

export const serverStateSelector = createSelector(
    generalSelector,
    slice => slice.serverState
);

export const currentUserSelector = createSelector(
    generalSelector,
    slice => slice.currentUser
);

export const currentUserOrdersSelector = createSelector(
    generalSelector,
    slice => slice.currentUserOrders
);
