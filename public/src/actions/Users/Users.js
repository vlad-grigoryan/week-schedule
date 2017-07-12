import * as types from  '../../actionType';

export const fetchUserData = (userData) => ({type: types.FETCH_USER_DATA, payload: userData});
export const fetchUserFail = (err) => ({type: types.FETCH_USER_DATA_FAIL, payload: err});
export const fetchAllUsers = (users) => ({type: types.FETCH_ALL_USERS, payload: users});
export const fetchAllUsersFail = (err) => ({type: types.FETCH_ALL_USERS_FAIL, payload: err});
