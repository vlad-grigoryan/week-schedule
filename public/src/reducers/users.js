import axios from 'axios';

import {getAccessToken} from './reducerHelper';

import {
    FETCH_USER_DATA,
    FETCH_ALL_USERS,
    FETCH_USER_DATA_FAIL,
    FETCH_ALL_USERS_FAIL

} from "../actionType";

import {
    fetchUserData,
    fetchUserFail,
    fetchAllUsers,
    fetchAllUsersFail
} from "../actions";


const initialState = {
    user: {
        userData: null,
        isFetchFailed: false,
        error: null
    },
    allUsers: {
        data: null,
        isFetchFailed: false,
        error: null
    }
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    userData: action.payload
                }
            };
            break;
        case FETCH_ALL_USERS:
            return {
                ...state,
                allUsers: {
                    ...state.allUsers,
                    data: action.payload,
                    isFetchFailed: false,
                    error: null
                }
            };
            break;
        case FETCH_USER_DATA_FAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    userData: null,
                    isFetchFailed: true,
                    error: action.payload
                }
            };
            break;
        case FETCH_ALL_USERS_FAIL:
            return {
                ...state,
                allUsers: {
                    ...state.allUsers,
                    data: null,
                    isFetchFailed: true,
                    error: action.payload,
                }
            };

        default :
            return state;
    }
};

export const fetchUser = () => {
    const request = getAccessToken();


    return (dispatch) => {

        request.then((userAccessToken) => {
            let header = {
                headers: {
                    'Access-Token': userAccessToken
                }
            };
            axios.get('/api/v1/user', header)
                .then((userData)=> {
                    dispatch(fetchUserData(userData.data))
                })
                .catch((err) => {
                if(err && err.response) {
                    dispatch(fetchUserFail(err.response))
                }

                });
        })
    }
};


export const fetchUsers = () => {
    const request = getAccessToken();


    return (dispatch) => {

        request.then((userAccessToken) => {
            let header = {
                headers: {
                    'Access-Token': userAccessToken
                }
            };
            axios.get('/api/v1/worktime', header)
                .then((response) => {
                    dispatch(fetchAllUsers(response.data))
                })
                .catch((err) => {
                    if(err && err.response) {
                        console.log(err.response, "err.response")
                        dispatch(fetchAllUsersFail(err.response))
                    }
                });
        })
    }
};

export default usersReducer;