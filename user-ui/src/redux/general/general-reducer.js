import types from "./general-types";
import serverStatus from "./serverUpdateStatus";

const INITIAL_STATE = {
    serverStatus: serverStatus.NOT_UPDATING,
    currentUser: null,
    currentUserOrders: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SET_SERVER_STATUS:
            return {
                ...state,
                serverStatus: action.payload
            };
        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case types.SET_CURRENT_USER_ORDERS:
            return {
                ...state,
                currentUserOrders: action.payload
            };
        default: return state;
    }
};

export default reducer;
