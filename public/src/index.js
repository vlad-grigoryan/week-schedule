import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import configureStore from './store/configureStore.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const store = configureStore();


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

