const config = require("../config");
const callsHandlerUtils = require("./callsHandlerUtils");
const uuid = require("uuid-random");
const {getSessionId, store} = require("../redux/sessionStorage");
const {currentUserSelector} = require("../redux/general/general-selector");

function standardHeaders() {
    return {
        transactionId: uuid(),
        sessionId: getSessionId(),
        userId: (currentUserSelector(store.getState()) || {id: 0}).id
    }
}

module.exports = {
    directURL(url, apiAndParams) {
        return url + apiAndParams;
    },
    callGET(baseURL, api, pathParams, params) {
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
    },

    callPOST(baseURL, api, pathParams, params, body) {
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
    },

    callDELETE(baseURL, api, pathParams, params) {
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
    },

    uploadFile(baseURL, api, file, onSuccess, onSuccessArgs) {
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
};