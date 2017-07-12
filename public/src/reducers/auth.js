import axios from 'axios';

import {getAccessToken} from './reducerHelper';

import {
    FETCH_AUTHENTICATION_FAIL,
    FETCH_AUTHENTICATION_START,
    FETCH_AUTHENTICATION_SUCCESS,

} from "../actionType";

import {
    fetchAuthFail,
    fetchAuthStart,
    fetchAuthSuccess,

} from "../actions";


const initialState = {
    fetchingState: {
        isStarted: false,
        isLoaded: false,
        isFailed: false,
        error: null
    },
    isAuthenticated: false,
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FETCH_AUTHENTICATION_START :
            return {
                ...state,
                fetchingState: {
                    ...state.fetchingState,
                    isStarted: true,

                }
            };
            break;
        case FETCH_AUTHENTICATION_FAIL:
            return {
                ...state,
                fetchingState: {
                    ...state.fetchingState,
                    isStarted: false,
                    isFailed: true,
                    isLoaded: true,
                    error: action.payload
                },
                isAuthenticated: false
            };
            break;
        case FETCH_AUTHENTICATION_SUCCESS :
            return {
                ...state,
                fetchingState: {
                    ...state.fetchingState,
                    isStarted: false,
                    isFailed: false,
                    error: null,
                    isLoaded: true
                },
                isAuthenticated: action.payload
            };
            break;
        default :
            return state;
    }
};


export const fetchAuth = () => {

    const request = getAccessToken();

    return (dispatch) => {
        dispatch(fetchAuthStart());
        request.then((userAccessToken) => {
            if(!userAccessToken) {
                return dispatch(fetchAuthFail(false));
            }
            let params = {
                token: userAccessToken
            };
            return axios.post('/api/v1/isAuth', params)
                .then((response)=> {
                    dispatch(fetchAuthSuccess(response.data.isAuthenticated));
                })
                .catch((err) => {
                    dispatch(fetchAuthFail(err))
                })

        })
    }
};

export const googleResponse = (response, history) => {
    return (dispatch) => {
        if (response.error) {
            dispatch(fetchAuthFail(response.error));
            return;
        }

        let params = {
            accessToken: response.accessToken
        };

        axios.post('/api/v1/user', params)
            .then((response) => {
                history.push('/dashboard');
            })
            .catch((error) => {
                if (error.response) {
                    gapi.auth2.getAuthInstance().disconnect();
                    dispatch(fetchAuthFail(error.response.data.details))
                }
            });
    }
};



export default authReducer;