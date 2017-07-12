import moment from 'moment';
import axios from 'axios';
import update from 'react-addons-update';
import { getAccessToken } from './reducerHelper';
import { fetchLateTimes, updateLateTImes } from "../actions";
import { FETCH_LATE_FOR_WORK_DATA, UPDATE_LATE_TIME } from "../actionType"


const initialState = {
    lateForWork: null
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LATE_FOR_WORK_DATA:
            return {
                ...state,
                lateForWork : action.payload
            };
        case UPDATE_LATE_TIME:
            return update(state, {
                lateForWork : {
                    [action.index] : {$set: action.payload}
                }
            });
        default:
            return state;
    }
};


export const fetchDashboard = () => {
    const request = getAccessToken();

    return (dispatch) => {

        request.then((userAccessToken) => {
            let header = {
                headers: {
                    'Access-Token': userAccessToken
                }
            };
            axios.get('/api/v1/myworktime', header)
                .then((lateForWorkData) => {
                    let lateData = processLateTime(lateForWorkData.data);
                    dispatch(fetchLateTimes(lateData));
                })
                .catch((err) => {
                    if(err && err.response) {
                        // console.log(err.response)
                    }
                })

        })
    }
};

export const changeLateTime = (index, time) => {
    const request = getAccessToken();

    return (dispatch) => {

        request.then((userAccessToken) => {
            let params = {
                changedTime : time,
                userAccessToken: userAccessToken

            };
            axios.post('/api/v1/worktime', params)
                .then((response)=> {
                    dispatch(updateLateTImes(index, time))
                })
                .catch((err) => {
                console.log(err, "errr")
                })
        })
    }
};

//TODO: Implement this function in custom middleware : optiional
const processLateTime = (workTimes) => {
    let lateTimes= [];
    let now = new Date();
    now.setHours(10);
    now.setMinutes(0);
    now.setSeconds(0);

    while( lateTimes.length !== 5) {
        let continueWhile = false;

        for( let i = 0; i < workTimes.length;  i++) {
            let workTime = new Date((workTimes[i].startTime));
            if(moment(new Date((workTime))).format('YYYY-MM-DD') === moment(now).format('YYYY-MM-DD')) {
                workTimes.splice(i, 1);
                continueWhile = true;
                lateTimes.push(workTime);
                break;
            }
        }

        if (!continueWhile) {
            if(now.getDay() !== 6 && now.getDay() !== 0) {
                lateTimes.push(new Date(now));
            }
        }
        now = new Date(now.setDate(now.getDate() + 1));
    }
    return lateTimes;
};

export default dashboardReducer;