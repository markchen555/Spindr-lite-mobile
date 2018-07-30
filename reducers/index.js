import { combineReducers } from 'redux';

import Auth from './authReducer';

const appReducer = combineReducers({
  Auth,
});

export default appReducer;