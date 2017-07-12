import {createStructuredSelector} from "reselect";
import * as input from '../selectorsInput';


export const dashboardSelector = createStructuredSelector({
    lateForWork: input.lateForWork
});

