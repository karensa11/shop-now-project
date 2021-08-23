import {createSelector} from "reselect";

const catalogSelector = (state) => state.catalogNs;

export const categoriesSelector = createSelector(
    [catalogSelector],
    catalogData => catalogData.categories
);

export const categoryItemsSelector = createSelector(
    [catalogSelector],
    catalogData => catalogData.categoryItems
);

export const searchResultsSelector = createSelector(
    [catalogSelector],
    catalogData => catalogData.searchResults
);

export const searchStringSelector = createSelector(
    [catalogSelector],
    catalogData => catalogData.searchResults
);
