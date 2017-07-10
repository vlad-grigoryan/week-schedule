import {SET_SIGNIN_STATUS} from '../actionType';
import Q from "Q";

const INIT_STATE = {
    auth: {
        isAuthenticated: false
    }

};


const usersReducer1 = (state = {isAuthenticated: INIT_STATE.auth.isAuthenticated}, action) => {
    switch (action.type) {
        case SET_SIGNIN_STATUS: {
            return {...state, isAuthenticated: action.payload}
        }
        default:
            return state
    }
};

export default usersReducer;


const FETCH_AUTHENTICATION_START = 'FETCH_AUTHENTICATION_START';
const FETCH_AUTHENTICATION_FAIL = 'FETCH_AUTHENTICATION_FAIL';
const FETCH_AUTHENTICATION_SUCCESS = 'FETCH_AUTHENTICATION_SUCCESS';

const APP_READY = "APP_READY";


const fetchAuthStart = () => ({type: FETCH_AUTHENTICATION_START});
const fetchAuthFail = (error) => ({type: FETCH_AUTHENTICATION_FAIL, payload: error});
const fetchAuthSuccess = (data) => ({type: FETCH_AUTHENTICATION_SUCCESS, payload: data});


gapi.load('auth2', () => {
    const request = gapi.auth2.init({
        client_id: config.gapiClientId,
        scope: 'profile'
    });


    request.then((GoogleAuth) => {
        let userAccessToken = GoogleAuth.currentUser.get().getAuthResponse().access_token;
        if (userAccessToken) {
            let params = {
                token: userAccessToken
            };
            axios.post('/api/v1/isAuth', params)
                .then((response) => {
                    this.props.SetSigninStatusAction(response.data.isAuthenticated);
                })
        } else {
            this.props.SetSigninStatusAction(false);
        }

    });

    return request;

});

const getAuth2 = () => {
    let deffered = Q.defer();
    gapi.auth2.init({
        client_id: config.gapiClientId,
        scope: 'profile'
    }).then((data) => {
        deffered.resolve(data)
    }).catch((err) => {
        deffered.reject(err)
    })

    return deffered.promise;

}


export const fetchAuth = () => {

    const request = getAuth2();

    return (dispatch) => {
        dispatch(fetchAuthStart());

        request.then((data) => {
            //...
            fetchAuthSuccess(data);
        }).catch((err) => {
            fetchAuthFail(err)
        })

    }
};


const initialState = {
    fetchingState: {
        isStarted: false,
        isLoaded: false,
        isFailed: false,
        error: null
    },
    isAuthenticated: false
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case  FETCH_AUTHENTICATION_START :
            return {
                ...state,
                fetchingState: {
                    ...state.fetchingState,
                    isStarted: true,

                }
            };
        case FETCH_AUTHENTICATION_FAIL:
            return {
                ...state,
                fetchingState: {
                    ...state.fetchingState,
                    isStarted: false,
                    isFailed: true,
                    error: action.payload

                }
            };
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

        default :
            return state;
    }
};

export const appReady = () => ({type: APP_READY});


const appReadyReducer = (state = false, action) => {
    switch (action.type) {
        case APP_READY :
            return true;
        default:
            return state;
    }
};
