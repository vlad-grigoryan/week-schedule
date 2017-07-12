import {createStructuredSelector} from "reselect";
import * as input from '../selectorsInput';


export const userSelector = createStructuredSelector({
    userData: input.userData,
    allUsers: input.allUsers
});

