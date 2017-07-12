import {createStructuredSelector} from "reselect";
import * as input from '../selectorsInput';


export const listSelector = createStructuredSelector({
    headerDateTimes: input.headerDateTimes
});

