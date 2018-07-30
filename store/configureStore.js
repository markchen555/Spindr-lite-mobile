import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { createLogger as logger } from 'redux-logger';
import rootReducer from '../reducers';


// Initialize middleware for redux
const middleware = applyMiddleware(thunk, logger());

// Initialize redux state with (reducers, middleware)
const store = createStore(rootReducer, middleware);

export default store;