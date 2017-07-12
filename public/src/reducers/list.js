import { setHeaderTimes } from "../actions";
import { SET_HEADER_TIMES } from "../actionType"

const initialState = {
    dateTimes: null
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HEADER_TIMES:
            return {
                ...state,
                dateTimes : action.payload
            };
        default:
            return state;
    }
};

// TODO: Implement this in middleware
export const setDateTime = () => {
    return (dispatch) => {
        let lateTimes= [];
        let now = new Date();
        now.setHours(10);
        now.setMinutes(0);
        now.setSeconds(0);

        while( lateTimes.length !== 5) {
            if(now.getDay() !== 6 && now.getDay() !== 0) {
                lateTimes.push(new Date(now));
            }
            now = new Date(now.setDate(now.getDate() + 1));
        }

        dispatch(setHeaderTimes(lateTimes))
    }
};


export default listReducer;