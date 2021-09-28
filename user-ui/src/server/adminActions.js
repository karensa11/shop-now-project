import * as serverAPIs from "./serverAPIs";
import * as actionUtils from "./actionsUtils";
import * as adminNsActions from "../redux/admin/admin-actions";

export function searchOrder(orderId, onNotFound) {
    return actionUtils.wrapGet({
        serverFunc: serverAPIs.searchOrder,
        params: {orderId: orderId},
        onNotFound: onNotFound,
        actionsCreator: adminNsActions.setCurrentOrder
    })
}
export function setDeliveredOn(orderId, onSuccess) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.setDeliveredOn,
        pathParams: {orderId: orderId},
        onSuccess: onSuccess
    })
}
export function closeOrder(orderId, onSuccess) {
    return actionUtils.wrapUpdate({
        serverFunc: serverAPIs.closeOrder,
        pathParams: {orderId: orderId},
        onSuccess: onSuccess
    })
}
