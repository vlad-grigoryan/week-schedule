import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
import thunk from 'redux-thunk';

const configureStore = () => {

    const createStoreWithMiddleware = applyMiddleware(
        thunk,
    )(createStore);

    const enhancers = compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    const store = createStoreWithMiddleware(rootReducer, {}, enhancers);


    return store;

};

export default configureStore;