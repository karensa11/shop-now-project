import types from "./admin-types";

const INITIAL_STATE = {
    currentOrders: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_CURRENT_ADMIN_ORDERS:
            return {
                ...state,
                currentOrders: action.payload
            };
        case types.CLEAR_ADMIN_DATA:
            return INITIAL_STATE;
        default: return state
    }
};

export default reducer;