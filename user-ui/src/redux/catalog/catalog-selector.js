import {createSelector} from "reselect";

const catalogSelector = (state) => state.catalogNs;

export const categoriesSelector = createSelector(
    catalogSelector,
    slice => slice.categories
);

export const categoryItemsSelector = createSelector(
    catalogSelector,
    slice => slice.categoryItems
);

export const searchResultsSelector = createSelector(
    catalogSelector,
    slice => slice.searchResults
);

export const searchStringSelector = createSelector(
    catalogSelector,
    slice => slice.searchResults
);
