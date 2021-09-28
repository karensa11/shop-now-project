const createHistory = require("history").createBrowserHistory;

export function refreshPage() {
    const historyBack = createHistory();
    historyBack.go(0);
}
export function extractQueryParam(location, param) {
    let result = "";
    if(location.search && location.search.length) {
        const queryParamsStr = location.search.substr(1, location.search.length);
        const queryParams = queryParamsStr.split("&");
        queryParams.forEach(queryParam => {
            if(queryParam.includes("=")){
                const queryParamSplit = queryParam.split("=");
                if(queryParamSplit[1].length > 0 && queryParamSplit[0] === param) {
                    result = queryParamSplit[1];
                }
            }
        });
    }
    return result;
}

export function navigateToHomePage(history) {
    history.push("/");
}
export function navigateToCart(history) {
    history.push("/cart");
}
export function navigateToSearchResults(history, searchQuery) {
    history.push("/search?q="+searchQuery);
}
export function navigateToLogin(history) {
    history.push("/signIn");
}
export function navigateToRegister(history) {
    history.push("/register");
}
export function navigateToAccount(history) {
    history.push("/account");
}
export function navigateToAdmin(history) {
    history.push("/admin");
}
