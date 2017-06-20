import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';

import {Login, Dashboard} from './pages';

export default (
    <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route render={() => <h1>Fuck off</h1>}/>
    </Switch>
);
