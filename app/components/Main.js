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
import Result1 from './Result1';
import Result2 from './Result2';
import Result3 from './Result3';
import Result4 from './Result4';
import Result5 from './Result5';

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
        <Route path="/start" component={Start}></Route>
        <Route path="/question/1" component={NewQuestion}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/result/1" component={Result1}></Route>
        <Route path="/result/2" component={Result2}></Route>
        <Route path="/result/3" component={Result3}></Route>
        <Route path="/result/4" component={Result4}></Route>
        <Route path="/result/5" component={Result5}></Route>
        <Router history={browserHistory} />
    </Router>
), document.getElementById("app"));

