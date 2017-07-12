import { combineReducers } from 'redux';

import users from './users';
import appReady from './appReady';
import dashboard from './dashboard';
import list from './list';
import auth from './auth';

const defaultReducer = combineReducers({
    users,
    appReady,
    dashboard,
    list,
    auth
});

export default defaultReducer