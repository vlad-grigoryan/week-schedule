import axios from 'axios';

//validate email, if success, then load user and login
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function validateEmail(validateEmailToken) {
    //check if token from welcome email is valid, if so, update email as verified and login the user from response
    const request = axios.get(`${ROOT_URL}/validateEmail/${validateEmailToken}`);

    return {
        type: VALIDATE_EMAIL,
        payload: request
    };
}