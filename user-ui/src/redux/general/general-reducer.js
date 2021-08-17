import types from "./general-types";
import serverStatus from "../../values/ServerUpdateStatus";

const INITIAL_STATE = {
    serverStatus: serverStatus.NOT_UPDATING
};

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SERVER_CALL_FAILED:
            return {
                ...state,
                serverStatus: serverStatus.FAILED
            };
        case types.SERVER_CALL_PENDING:
            return {
                ...state,
                serverStatus: serverStatus.UPDATING
            };
        case types.SERVER_CALL_FINISHED:
            return {
                ...state,
                serverStatus: serverStatus.NOT_UPDATING
            };
        default: return state;
    }
};

export default reducer;
