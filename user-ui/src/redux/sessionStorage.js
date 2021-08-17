import {applyMiddleware, createStore, compose} from "redux";
import handleTransitions from "redux-history-transitions";
import reducer from "./rootReducer";
import thunk from "redux-thunk";

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem("state");

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (error) {
        // Ignore write errors.
    }
};

const middlewere = applyMiddleware(
    thunk
);
const transitionsEnhancer = handleTransitions([]);
const persistedState = loadState();
const composedEnhancers = compose(middlewere, transitionsEnhancer);
export const store = createStore(reducer, persistedState, composedEnhancers);
store.subscribe(() => {
    saveState(store.getState());
});
