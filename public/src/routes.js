import React from 'react';
import {HashRouter, Route, Link, Switch} from 'react-router-dom';

import {Login, Dashboard, List} from './pages';
import {requireAuthentication} from './containers';


const MainWrapper = (props) => {
    if (props.appReady) {
        return props.children
    }

    return (
        <div>loading....</div>
    )
};

//props appReady prps!!


export default (
    <Switch>
        <MainWrapper>
            <Route path="/" exact={true} component={Login}/>
            <Route path="/dashboard" component={requireAuthentication(Dashboard)}/>
            <Route path="/list" component={requireAuthentication(List)}/>
            <Route render={() => <h1>404 Page</h1>}/>
        </MainWrapper>
    </Switch>
);



