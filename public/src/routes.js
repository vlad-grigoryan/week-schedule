import React from 'react';
import { Route, Link, Switch} from 'react-router-dom';

import {Login, Dashboard, List} from './pages';
import {requireAuthentication, MainWrapper, LoginContainer} from './containers';


export default (

        <Switch>
            <MainWrapper>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/list" component={List}/>
            </MainWrapper>
                <Route render={() => <h1>404 Page</h1>}/>
        </Switch>

);



