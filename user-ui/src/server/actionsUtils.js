import * as generalActions from "../redux/general/general-actions";
import serverResponseTypes from "./serverResponseTypes";

export function handleServerUpdate({response, dispatch, onSuccess, onConflict})
{
    if(response && response.serverErrorCode === serverResponseTypes.FAILURE){ // response can come empty from update
        const {serverErrorCode} = response;
        if (serverErrorCode === serverResponseTypes.CONFLICT && onConflict) { // conflict in creation - details already exists
            onConflict();
        } else {
            dispatch(generalActions.serverCallFailed());
        }
    }
    else{
        dispatch(generalActions.serverCallFinished());
        if (onSuccess) {
            console.log("handleServerUpdate - onSuccess 1");
            if (Array.isArray(onSuccess)) {
                onSuccess.forEach(onSuccessFunc => {
                    dispatch(onSuccessFunc(response));
                });
            } else {
                console.log("handleServerUpdate - onSuccess 2");
                dispatch(onSuccess(response));
            }
        }
    }
}
export function handleServerGet({response, dispatch, actionsCreator, onSuccess, onNotFound})
{
    if(response.serverErrorCode){
        const {serverErrorCode} = response;
        if (serverErrorCode === serverResponseTypes.NOT_FOUND && onNotFound) { // details not found (e.g. search user by email). expected status 404
            onNotFound();
        } else {
            dispatch(generalActions.serverCallFailed());
        }
    } else{
        dispatch(generalActions.serverCallFinished());
        actionsCreator && dispatch(actionsCreator(response));
        onSuccess && dispatch(onSuccess(response));
    }
}

export function wrapGet({serverFunc, actionsCreator, pathParams, params, body, onSuccess, onNotFound}) {
    return (dispatch) => {
        dispatch(generalActions.serverCallStarted());
        return serverFunc(pathParams, params, body)
            .then(response => {
                handleServerGet({response, dispatch, actionsCreator, onSuccess, onNotFound});
            }).catch(() => dispatch(generalActions.serverCallFailed()));
    }
}

export function wrapUpdate({serverFunc, pathParams, params, body, onSuccess, onFailure, onNotFound, onConflict}) {
    return (dispatch) => {
        dispatch(generalActions.serverCallStarted());
        return serverFunc(pathParams, params, body)
            .then(response => {
                handleServerUpdate({response, dispatch, onSuccess, onNotFound, onConflict});
            }).catch((response) => {
                dispatch(generalActions.serverCallFailed());
                onFailure && onFailure(response);
            });
    }
}
