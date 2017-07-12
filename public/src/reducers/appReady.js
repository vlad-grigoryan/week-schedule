import {APP_READY} from '../actionType';
import {appReady} from '../actions';

const appReadyReducer = (state = false, action) => {
    switch (action.type) {
        case APP_READY :
            return true;
        default:
            return state;
    }
};


export default appReadyReducer;