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
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
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
        <Route path="/" component={Main}></Route>
        <Route path="/start" component={Start}></Route>
        <Route path="/question/1" component={Question1}></Route>
        <Route path="/question/2" component={Question2}></Route>
        <Route path="/question/3" component={Question3}></Route>
        <Route path="/question/4" component={SignUp}></Route>
    </Router>
), document.getElementById("app"));

