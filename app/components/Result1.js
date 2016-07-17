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
require('../styles/Result.css');

var Result1 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 0,
            result: []
        };
    },

    componentWillMount() {
        $('#app').removeClass('QCM-long');
        console.log('PROPS',  this.props.location.state);
        this.state.profiles = this.props.location.state.profiles;
        console.log('RESULT1', this.state);
    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 5; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    nextPage(){
        console.log('nextPage');

        this.setState({  
            pageNumber:this.state.pageNumber + 1
        });

        this.context.router.push({
            pathname: '/result/2',
            state: { 
                    profiles: this.state.profiles
                }
            });
    },

    render: function() {
        console.log(this.state);
        return (
            <div className="wrapper-result">
                <div className="top-wrapper"></div>
                <div>
                    <div className="result-title">result</div>
                    <div className="result-title result-title_value">k-profile</div>
                    <div className="result-title result-text">you are in</div>
                    <div className="result-title result-text_red">{this.state.profiles[0].profileBenefit}</div>
                    <div className=" result-text_thin">{this.state.profiles[0].profileDescription}</div>
                    <div className="wrapper-counter">
                        {this.dynanamicPagination()}
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText">in-salon ritual</div>
                        <div className="linkArrow"  onClick={this.nextPage}></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Result1;


