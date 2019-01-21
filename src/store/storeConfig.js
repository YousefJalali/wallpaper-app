import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import wallpapersReducer from "./reducers/wallpapers";
// import uiReducer from "./reducers/ui";

const rootReducer = combineReducers({
  wallpapers: wallpapersReducer
  // ui: uiReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeConfig = () => {
  // return createStore(rootReducer, applyMiddleware(thunk));
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default storeConfig;
