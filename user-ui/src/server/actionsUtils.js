import * as generalActions from "../redux/general/general-actions";

export function handleServerUpdate(response, dispatch, onSuccess)
{
    if(response && response.code === "failure"){
        dispatch(generalActions.serverCallFailed());
    }
    else{
        dispatch(generalActions.serverCallFinished());
        dispatch(generalActions.cancelEdit());
        onSuccess && dispatch(onSuccess(response));
    }
}
export function handleServerGet(response, dispatch, actionCreator, onSuccess)
{
    if(!response || response.code === "failure"){
        dispatch(generalActions.serverCallFailed());
    }
    else{
        dispatch(generalActions.serverCallFinished());
        dispatch(actionCreator(response));
        onSuccess && dispatch(onSuccess(response));
    }
}

export function wrapGet(serverFunc, actionsCreator, pathParams, params, onSuccess) {
    return (dispatch) => {
        dispatch(generalActions.serverCallStarted());
        return serverFunc(pathParams, params)
            .then(response => {
                handleServerGet(response, dispatch, actionsCreator, onSuccess);
            }).catch(() => dispatch(generalActions.serverCallFailed()));
    }
}

export function wrapUpdate(serverFunc, pathParams, params, body, onSuccess) {
    return (dispatch) => {
        dispatch(generalActions.serverCallStarted());
        return serverFunc(pathParams, params, body)
            .then(response => {
                handleServerUpdate(response, dispatch, onSuccess);
            }).catch(() => dispatch(generalActions.serverCallFailed()));
    }
}
