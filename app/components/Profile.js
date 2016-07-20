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
        $('#app').addClass('QCM-long')
        console.log("componentWillMount",this.props);

        this.state.selectedProfileIndex=0;
        var profile = this.props.location.state.profiles[this.state.selectedProfileIndex];

        if(profile instanceof Parse.Object==false){
            console.log("has not get method");
            profile.className = "Profile";
             profile =  Parse.Object.fromJSON(profile);

        }


        this.state.profile = profile;



        console.log("componentWillMount",this.props.location.state);

        var _this = this;

        console.log("this profile",this.state.profile);

        console.log("profile",profile instanceof Parse.Object);


        Parse.Object.fetchAllIfNeeded(profile.get("products"), {
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
                    products: this.state.products,
                    selectedProfileIndex:this.state.selectedProfileIndex
                }
            });
    },

    render: function() {
        console.log(this.state);
        return (
            <div className="wrapper-result container">
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    <div className="profile-text-wrapper col-xs-12 .col-sm-12 .col-md-12 .col-lg-12 .col-xl-12">
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
            </div>
        );
    }
});

module.exports = Profile;


