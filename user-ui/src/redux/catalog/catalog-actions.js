import types from "./catalog-types";

export const setCategories = (categories) => ({
    type: types.SET_CATEGORIES,
    payload: categories
});

export const setCategoryData = (categoryData) => ({
    type: types.SET_CATEGORY_ITEMS,
    payload: categoryData
});
