'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory,hashHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from './Header';
import NewQuestion from './NewQuestion';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import SignUp from './SignUp';
import Profile from './Profile';
import InSalon from './InSalon';
import AtHome from './AtHome';
import StoreLocator from './StoreLocator';
import ShareDiagnosis from './ShareDiagnosis';

require('../styles/Main.css');

var Main = React.createClass({
    render: function() {
        return (
            <div className="main-container">
                <NewQuestion/>
            </div>
        );
    }
});

render((
    <Router history={browserHistory}>
        <Route path="/" component={NewQuestion}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/in-salon" component={InSalon}></Route>
        <Route path="/at-home" component={AtHome}></Route>
        <Route path="/store-locator" component={StoreLocator}></Route>
        <Route path="/share-diagnosis" component={ShareDiagnosis}></Route>
        <Router history={browserHistory} />
    </Router>
), document.getElementById("app"));

