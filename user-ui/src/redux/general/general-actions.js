import types from "./general-types";
import serverStatus from "./serverUpdateStatus";

export function serverCallStarted(){
    return {
        type: types.SET_SERVER_STATUS,
        payload: serverStatus.UPDATING
    }
}

export function serverCallFailed(){
    return {
        type: types.SET_SERVER_STATUS,
        payload: serverStatus.FAILED
    }
}

export function serverCallFinished(){
    return {
        type: types.SET_SERVER_STATUS,
        payload: serverStatus.NOT_UPDATING
    }
}

export function login(user) {
    return {
        type: types.SET_CURRENT_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: types.SET_CURRENT_USER,
        payload: null
    }
}

export function setCurrentUserOrders(orders) {
    return {
        type: types.SET_CURRENT_USER_ORDERS,
        payload: orders
    }
}
