import types from "./admin-types";

const INITIAL_STATE = {
    currentOrder: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_CURRENT_ADMIN_ORDER:
            return {
                ...state,
                currentOrder: action.payload
            };
        default: return state
    }
};

export default reducer;