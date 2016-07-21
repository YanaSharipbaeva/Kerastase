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
import Footer from "./Footer";
import Social from "./Social";

require('../styles/Main.css');
require('../styles/Result.css');
import Pagination from "./Pagination";
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
  
        console.log('PROPS',  this.props.location.state);
        this.state.profile = this.props.location.state.profile;
        this.state.products = this.props.location.state.products;

        console.log("PRODUCTS" , this.state.products);
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
            <div className="wrapper-in-salon_ritual store-locator container">
                <Header />

                <div className="row">
                    <div className="info-block_title">SALON LOCATOR</div>
                </div>
                 <div className="row">
                    <div className="result4-text">Find a kérastase salon</div>
                </div>
                <div className="row">
                    <div className="result4-text_info">Only an expert observation and touch can confirm these results. Experience personalized luxury with a Kérastase Consultant near you.</div>
                </div>
                <div className="row">
                    <div className="map-wrapper">
                        <div className="result4-image_map"></div>
                        <a target="_blank" href="http://salons.kerastase.co.uk/" className="salon_link"> > Find your nearest Salon</a>
                    </div>
                </div>
                <div className="row">
                        <Footer onClick={this.nextPage} title="Receive by email"/>
                        <Social/>
                </div>
                <Pagination pageNumber={this.state.pageNumber}/>
            </div>
        );
    }
});

module.exports = StoreLocator;


