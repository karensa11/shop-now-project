import * as serverAPIs from "./serverAPIs";
import * as actionUtils from "./actionsUtils";
import * as adminNsActions from "../redux/admin/admin-actions";

export function searchOrder(userId) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.searchPlacedOrders,
        pathParams: {userId: userId},
        actionsCreator: adminNsActions.setCurrentOrders
    })
}
export function setDeliveredOn(orderId, onSuccess) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.setDeliveredOn,
        pathParams: {orderId: orderId},
        onSuccess: onSuccess
    })
}
export function searchByEmail(email, onNotFound, onSuccess) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.searchUserByEmail,
        params: {email: email},
        onSuccess: onSuccess,
        onNotFound: onNotFound
    })
}
