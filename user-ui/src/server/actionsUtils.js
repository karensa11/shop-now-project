import * as generalActions from "../redux/general/general-actions";
import serverResponseTypes from "./serverResponseTypes";

export function handleServerUpdate({response, dispatch, onSuccess, onConflict, onFailure})
{
    if(response) { // response can come empty from update
        const {serverErrorCode} = response;
        if (serverErrorCode === serverResponseTypes.FAILURE || serverErrorCode === serverResponseTypes.BAD_REQUEST) {
            dispatch(generalActions.serverCallFailed());
            onFailure && dispatch(onFailure(response));
            return;
        } else if (serverErrorCode === serverResponseTypes.CONFLICT && onConflict) {
            onConflict();
            return;
        }
    }
    dispatch(generalActions.serverCallFinished());
    if (onSuccess) {
        if (Array.isArray(onSuccess)) {
            onSuccess.forEach(onSuccessFunc => {
                dispatch(onSuccessFunc(response));
            });
        } else {
            dispatch(onSuccess(response));
        }
    }
}
export function handleServerGet({response, dispatch, actionsCreator, onSuccess, onNotFound})
{
    if(response.serverErrorCode){
        const {serverErrorCode} = response;
        // details not found (e.g. search user by email). expected status 404
        if (serverErrorCode === serverResponseTypes.NOT_FOUND && onNotFound) {
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
                handleServerUpdate({response, dispatch, onSuccess, onNotFound, onConflict, onFailure});
            }).catch((response) => {
                dispatch(generalActions.serverCallFailed());
                onFailure && onFailure(response);
            });
    }
}
