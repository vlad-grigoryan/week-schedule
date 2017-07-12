import * as types from  '../../actionType';

export const fetchLateTimes = (lateForWorkData) => ({type: types.FETCH_LATE_FOR_WORK_DATA, payload: lateForWorkData});
export const updateLateTImes = (index, lateTime) => ({type: types.UPDATE_LATE_TIME, index: index, payload: lateTime});
