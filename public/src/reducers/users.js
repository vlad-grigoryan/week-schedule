import { SET_SIGNIN_STATUS } from '../actionType';

const INIT_STATE = {
    auth: {
        isAuthenticated : false
    }

};

const usersReducer = (state = {isAuthenticated : INIT_STATE.auth.isAuthenticated}, action) => {
  switch (action.type) {
      case SET_SIGNIN_STATUS: {
          return { ...state, isAuthenticated: action.payload }
      }
      default:
          return state
  }
};

export default usersReducer;
