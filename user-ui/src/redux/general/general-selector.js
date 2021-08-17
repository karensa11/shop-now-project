import {createSelector} from "reselect";

const generalSelector = (state) => state.generaNs;

export const serverStateSelector = createSelector(
    [generalSelector],
    generalSelector => generalSelector.serverState
);
