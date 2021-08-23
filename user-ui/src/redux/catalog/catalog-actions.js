import types from "./catalog-types";

export const setCategories = (categories) => ({
    type: types.SET_CATEGORIES,
    payload: categories
});

export const setCategoryData = (categoryData) => ({
    type: types.SET_CATEGORY_ITEMS,
    payload: categoryData
});

export const setSearchResults = (searchResults) => ({
    type: types.SET_SEARCH_RESULTS,
    payload: searchResults
});

export const setSearchString = (searchString) => ({
    type: types.SET_SEARCH_STRING,
    payload: searchString
});
