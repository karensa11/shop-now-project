
module.exports = {
    createParamsURL: function(baseURL, api, pathParams, params) {
        let URL = baseURL;
        let modifiedAPI = api;
        if (pathParams) {
            Object.keys(pathParams).forEach(key => {
                modifiedAPI = modifiedAPI.replace("{" + key + "}", pathParams[key]);
            });
        }
        URL += modifiedAPI;
        if(params) {
            let paramsStr = "?";
            Object.keys(params).forEach(key => {
                if (paramsStr.length > 1) {
                    paramsStr += "&";
                }
                paramsStr += key + "=" + params[key];
            });
            URL += paramsStr;
        }
        return URL;
    },
    fetchWithTimeout: function(baseURL, options, delay, callback) {
        const timer = new Promise((resolve) => {
            setTimeout(resolve, delay, {
                timeout: true,
            });
        });
        return Promise.race([
            fetch(baseURL, options),
            timer
        ]).then(
            (response) => {
            if(response.timeout) {
                console.log("timeout");
                callback({code: "failure"});
            } else if (response.status !== 200) {
                console.log("failure");
                callback({code: "failure"});
            } else {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return callback(response.json());
                }
                else {
                    return callback({});
                }
            }
        }, (err) => {callback({code: "failure"});});
    }
}
