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

require('../styles/Main.css');
require('../styles/Result.css');

var Result3 = React.createClass({
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
        this.state.profiles = this.props.location.state.profiles;
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
            pathname: '/result/4',
            state: { 
                    profiles: this.state.profiles
                }
        });
    },

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual">
                <div className="info-block_title">AT-Home PROGRAM</div>
                <div className="info-block image-block">
                    <div className="info-block_wrapper">
                        <div className="info-image1"></div>
                        <div className="info-image2"></div>
                        <a href="" className="salon_link"> > Shop Now</a>
                    </div>
                </div>
                <div className="info-block text_block">
                     <div className="text_wrapper">
                        <p className="result-title info-text_title">Nutritive protocole immunité secheresse</p>
                        <p className="info-text">The Kérastase Nutritive range, a nourishing care designed to make hair supple and irresistibly soft to the touch, targets dry hair symptoms at the core with a custom routine for three levels of dryness. Nutritive Irisome 1 answers to the first level of dryness: slightly dry hair.</p>
                    </div>
                    <div className="text_wrapper">
                        <ul className="info-text">
                            <li>recommended routine</li>
                            <li>1. Bathe : Bain satin 1</li>
                            <li>2. Treat : Lait Vital</li>
                            <li>3. Texturize : Nectar thermique</li>
                        </ul>
                    </div>
                    <div className="products">
                        
                    </div>
                </div>
                <div>
                    <div className="wrapperNext">
                        <div className="linkText">Receive by</div>
                        <div className="linkArrow"  onClick={this.nextPage}></div>
                    </div>
                    <div className="social-links">
                        <div className="social-links_title">share this ritual</div>
                        <div className="s_link">
                            <a href="https://twitter.com" className="fa fa-twitter" aria-hidden="true"></a>
                        </div>
                        <div className="s_link">
                            <a href="https://facebook.com" className="fa fa-facebook" aria-hidden="true"></a>
                        </div>
                    </div> 
                    <Link to="/start" className="restart_profile">Restart K profile</Link> 
                </div>
                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>
            </div>
        );
    }
});

module.exports = Result3;


