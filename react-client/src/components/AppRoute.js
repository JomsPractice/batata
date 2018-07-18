import React from 'react';
import { BrowserRouter, Route, hashHistory, Switch } from 'react-router-dom';
import Login from './Login.js';
import Signup from './signup.js';


class AppRoute extends React.Component {
    constructor (props) {
        super(props);
        this.state = { };
    }

    render () {
        return (
            <BrowserRouter history={hashHistory}>
                <Switch>
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/' component={Login} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRoute;