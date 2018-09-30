import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import thunk from "redux-thunk";


// reducers

import { authReducer, orderReducer, reportReducer, depositReducer } from "./reducers";

export const rootReducer = combineReducers({
    authReducer,
    orderReducer,
    reportReducer,
    depositReducer
});

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware)
