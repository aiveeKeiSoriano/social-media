import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";

let netReducer = combineReducers({auth: userReducer})

const store = createStore(netReducer, applyMiddleware(logger, thunk))

export default store