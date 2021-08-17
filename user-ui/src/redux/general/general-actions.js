import types from "./general-types";

export function serverCallStarted(){
    return {
        type: types.SERVER_CALL_PENDING
    }
}

export function serverCallFailed(){
    return {
        type: types.SERVER_CALL_FAILED
    }
}

export function serverCallFinished(){
    return {
        type: types.SERVER_CALL_FINISHED
    }
}

export function cancelEdit() {
    return {
        type: types.SERVER_CALL_FINISHED
    }
}
