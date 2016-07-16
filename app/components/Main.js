'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from './Header';
import Start from './Start';
import NewQuestion from './NewQuestion';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import SignUp from './SignUp';

require('../styles/Main.css');

var Main = React.createClass({
    render: function() {
        return (
            <div className="main-container">
                <Start/>
            </div>
        );
    }
});

render((
    <Router history={browserHistory}>
        <Route path="/" component={Start}></Route>
        <Route path="/question/1" component={NewQuestion}></Route>
        <Route path="/signUp" component={SignUp}></Route>
    </Router>
), document.getElementById("app"));

