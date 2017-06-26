import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import {Login, Dashboard} from './pages';
import {requireAuthentication } from './containers';

export default (
    <Switch>
        <Route path="/" exact={true}  component={requireAuthentication(Login)} />
        <Route path="/login"  component={requireAuthentication(Login)} />
        <Route path="/dashboard" component={requireAuthentication(Dashboard)} />
        <Route render={() => <h1>404 Page</h1>}/>
    </Switch>
);
