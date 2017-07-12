import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './configureStore'

const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";


import Routes from './routes';
import reducers from './reducers';
import {appReady} from "./actions";
import './main.scss'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const logger = store => next => action => {
    console.log('PrevState', store.getState());
    console.log('Action', action);
    next(action);
    console.log('Next State', store.getState());
};

const store = configureStore()

//application bootsraping!
script.onload = () => {
    store.dispatch(appReady())
};

document.body.appendChild(script);


ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
            <Router history={ history }>
                {Routes}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

