import config from "../config";
import * as callsHandlerUtils from "./callsHandlerUtils";
import uuid from "uuid-random";
import {getSessionId, store} from "../redux/sessionStorage";
import {currentUserSelector} from "../redux/general/general-selector";

function standardHeaders() {
    const currentUser = currentUserSelector(store.getState());
    const  header = {
        transactionId: uuid(),
        sessionId: getSessionId(),
    };
    if (currentUser) {
        header.authenticationId = currentUser.id;
    }
    return header;
}
export function callGET(baseURL, api, pathParams, params) {
    let URL = callsHandlerUtils.createParamsURL(baseURL, api, pathParams, params);
    return callsHandlerUtils.fetchWithTimeout(
        URL,
        {
            method: "GET",
            headers: {
                ...standardHeaders(),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        },
        config.timeoutInterval,
        (result) => {return result});
}
export function callPOST(baseURL, api, pathParams, params, body) {
    let URL = callsHandlerUtils.createParamsURL(baseURL, api, pathParams, params);
    return callsHandlerUtils.fetchWithTimeout(
        URL,
        {
            method: "POST",
            headers: {
                ...standardHeaders(),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        },
        config.timeoutInterval,
        (result) => {return result});
}
export function callPUT(baseURL, api, pathParams, params, body) {
    let URL = callsHandlerUtils.createParamsURL(baseURL, api, pathParams, params);
    return callsHandlerUtils.fetchWithTimeout(
        URL,
        {
            method: "PUT",
            headers: {
                ...standardHeaders(),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        },
        config.timeoutInterval,
        (result) => {return result});
}
export function callDELETE(baseURL, api, pathParams, params) {
    let URL = callsHandlerUtils.createParamsURL(baseURL, api, pathParams, params);
    return callsHandlerUtils.fetchWithTimeout(
        URL,
        {
            method: "DELETE",
            headers: {
                ...standardHeaders(),
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        },
        config.timeoutInterval,
        (result) => {return result});
}
export function uploadFile(baseURL, api, file, onSuccess, onSuccessArgs) {
    const data = new FormData();
    data.append("file", file);
    const init = {
        method: "POST",
        body: data,
        headers: standardHeaders()
    };

    if (onSuccess) {
        return fetch(baseURL + api, init)
            .then(res => res.text())
            .then(data => onSuccess(data, onSuccessArgs));
    } else {
        return fetch(baseURL + api, init)
            .then(res => res.text());
    }
}