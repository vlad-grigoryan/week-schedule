import * as types from  '../../actionType';

export const fetchAuthStart = () => ({type: types.FETCH_AUTHENTICATION_START});
export const fetchAuthFail = (error) => ({type: types.FETCH_AUTHENTICATION_FAIL, payload: error});
export const fetchAuthSuccess = (data) => ({type: types.FETCH_AUTHENTICATION_SUCCESS, payload: data});