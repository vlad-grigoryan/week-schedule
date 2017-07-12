import {createStructuredSelector} from "reselect";
import * as input from '../selectorsInput';


export const authSelector = createStructuredSelector({
    isLoaded: input.isLoaded,
    isStarted: input.isStarted,
    error: input.error,
    isAuthenticated: input.isAuthenticated,

});

