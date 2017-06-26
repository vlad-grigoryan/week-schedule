import { combineReducers } from 'redux';

import users from './users';

const defaultReducer = combineReducers({
    users
});

export default defaultReducer