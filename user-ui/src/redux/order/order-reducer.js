import types from "./order-types";

const INITIAL_STATE = {
    currentOrder: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_CURRENT_ORDER:
            return {
                currentOrder: action.payload
            };
        default: return state;
    }
}

export default reducer;
