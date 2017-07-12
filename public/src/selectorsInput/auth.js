export const isLoaded = state => state.auth.fetchingState.isLoaded;
export const isStarted = state => state.auth.fetchingState.isStarted;
export const error = state => state.auth.fetchingState.error;
export const isAuthenticated = state => state.auth.isAuthenticated;