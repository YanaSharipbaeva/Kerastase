'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';
import NewQuestion from './NewQuestion';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';

require('../styles/Main.css');
require('../styles/Result.css');

var Result2 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 1,
            result: []
        };
    },

    componentWillMount() {
        $('#app').addClass('QCM-long');
        console.log('PROPS',  this.props.location.state);
        this.state.profiles = this.props.location.state.profiles;
        console.log(this.state);
    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 4; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 4; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    nextPage(){
        console.log('nextPage');
        this.context.router.push({
            pathname: '/result/2',
            state: { 
                    profiles: this.state.profiles
                }
        });
    },

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual">
                <div className="info-block_title">in-salon ritual</div>
                <div className="info-block">
                    <div className="info-block_wrapper">
                        <div className="info-image1"></div>
                        <div className="info-image2"></div>
                        
                    </div>
                </div>
                <div className="info-block">
                        <div className="text_wrapper">
                            <ul className="info-text">
                                <li>3 benefits of in-salon treatment:</li>
                                <li>1. Prescription: Your hairdresser applies the correct dosage tailored to your specific level of dryness.</li>
                                <li>2. Transformation: Hair is instantly suppler, shinier. You experience the Nutritive touch.</li>
                                <li>3. Extension: The treatment anchors nutrients inside the hair, even after several shampoos.</li>
                            </ul>
                        </div>
                         <div className="text_wrapper">
                            <p className="result-title info-text_title">Nutritive protocole immunité secheresse</p>
                            <p className="info-text">Kérastase presents custom solutions that respond to any levels of dryness thoroughly, from the inside out, restoring an irresistible sense of touch. Protocole Immunité goes one level deeper to restore a sense of touch to the hair, available only in Kérastase Salons.</p>
                        </div>
                </div>
                <div>
                    <div className="wrapperNext">
                        <div className="linkText">At-Home program</div>
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

module.exports = Result2;


