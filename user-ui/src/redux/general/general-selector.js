import {createSelector} from "reselect";

const generalSelector = (state) => state.generalNs;

export const serverStateSelector = createSelector(
    [generalSelector],
    generalSelector => generalSelector.serverState
);

export const currentUserSelector = createSelector(
    [generalSelector],
    generalSelector => generalSelector.currentUser
)
