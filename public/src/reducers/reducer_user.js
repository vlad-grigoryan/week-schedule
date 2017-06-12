import {
    VALIDATE_EMAIL
} from '../actions/users';
//user = userobj,
// status can be:
// 1. 'storage' ie. localstorage / sessionstorage)
// 2. 'signup' (signing up)
// 3. 'signin' (signing in)
// 4. 'validate'(validate fields)
// 5. 'validate_email' (validating email token)
// 5. 'authenticated'(after signin)
// 6. 'logout' (after logout)

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};


export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case VALIDATE_EMAIL://check email verification token
            return { ...state, user: null, status:'validate_email', error:null, loading: true};

        default:
            return state;
    }
}