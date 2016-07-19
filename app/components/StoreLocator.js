'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import Header from './Header';

require('../styles/Main.css');
require('../styles/Result.css');

var StoreLocator = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 3,
            result: []
        };
    },

    componentWillMount() {
        $('#app').addClass('QCM-long');
  
        console.log('PROPS',  this.props.location.state);
        this.state.profile = this.props.location.state.profile;
        this.state.products = this.props.location.state.products;

        console.log("PRODUCTS" , this.state.products);
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
        this.context.router.push({
            pathname: '/share-diagnosis',
            state: { 
                    profile: this.state.profile,
                    products:this.state.products
                }
        });
    },

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual">
                <Header />
                <div className="info-block_title">SALON LOCATOR</div>
                <div className="result4-text">Find a kérastase salon</div>
                <div className="result4-text_info">Only an expert observation and touch can confirm these results. Experience personalized luxury with a Kérastase Consultant near you.</div>
                <div className="map-wrapper">
                    <div className="result4-image_map"></div>
                    <a target="_blank" href="http://salons.kerastase.co.uk/" className="salon_link"> > Find your nearest Salon</a>
                </div>
                <div>
                    <div className="wrapperNext">
                        <div className="linkText">Receive by email</div>
                        <div className="linkArrow"  onClick={this.nextPage}></div>
                    </div>
                    <div className="social-links">
                        <div className="social-links_title"></div>
                        <div className="s_link">
                            <a href="https://twitter.com" className="fa fa-twitter" aria-hidden="true"></a>
                        </div>
                        <div className="s_link">
                            <a href="https://facebook.com" className="fa fa-facebook" aria-hidden="true"></a>
                        </div>
                    </div> 
                    <div className="restart_profile">Restart K profile</div> 
                </div>
                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>
            </div>
        );
    }
});

module.exports = StoreLocator;


