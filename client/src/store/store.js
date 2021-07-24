import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import followReducer from "../reducers/followReducer";
import postsReducer from "../reducers/postsReducer";
import userReducer from "../reducers/userReducer";

let netReducer = combineReducers({auth: userReducer, posts: postsReducer, follow: followReducer })

const store = createStore(netReducer, applyMiddleware(logger, thunk))

export default store