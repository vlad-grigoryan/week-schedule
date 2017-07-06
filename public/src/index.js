import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Routes from './routes';
import reducers from './reducers';
import './main.scss'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const logger = store => next => action => {
    console.log('PrevState', store.getState());
    console.log('Action', action);
    next(action);
    console.log('Next State', store.getState());
};

const store = createStore(
    reducers,
    // applyMiddleware(logger)
);



ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
            <Router>
                {Routes}
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

