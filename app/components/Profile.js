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

var Profile = React.createClass({
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

        console.log("componentWillMount");

        this.state.profile = this.props.location.state.profiles[0];

        var _this = this;

        Parse.Object.fetchAllIfNeeded(this.state.profile .get("products"), {
            success: function(list) {
                console.log("success",list);

                _this.setState({
                    products: list
                })


            },
            error: function(error) {
                console.log("error",error);
            },
        });

        console.log('PROPS',  this.props.location.state);
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
            pathname: '/in-salon',
            state: { 
                    profile: this.state.profile,
                    products: this.state.products
                }
            });
    },

    render: function() {
        console.log(this.state);
        return (
            <div className="wrapper-result">
                <Header />
                <div className="profile-text-wrapper">
                    <div className="result-title">result</div>
                    <div className="result-title result-title_value">k-profile</div>
                    <div className="result-title result-text">you are in</div>
                    <div className="result-title result-text_red">{this.state.profile.get("profileBenefit")}</div>
                    <div className=" result-text_thin">{this.state.profile.get("profileDescription")}</div>
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

module.exports = Profile;


