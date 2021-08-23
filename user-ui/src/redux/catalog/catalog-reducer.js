import types from "./catalog-types";

const INITIAL_STATE = {
    categories: [],
    categoryItems: [],
    searchResults: [],
    searchString: ""
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case types.SET_CATEGORY_ITEMS:
            return {
                ...state,
                categoryItems: action.payload
            };
        case types.SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case types.SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.payload
            };
        default: return state;
    }
};

export default reducer;
