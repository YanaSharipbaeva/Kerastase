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

var ShareDiagnosis = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 4,
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

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual reseiveByEmail">
                <Header /> 
                <div className="info-block_title">Receive by email</div>
                <div className="result4-text_info result5-text_info">Keep your personal routine recommendation handy by saving it in your inbox.</div>
                <div className="result-send">Send </div>
                <div className="connect-title">connect with us</div>
                <div className="social-wrapper">
                    <a href="http://instagram.com/kerastaseuk" target="_blank" className="social-link_big fa fa-instagram" aria-hidden="true">
                    </a>
                    <a href="https://www.youtube.com/user/KerastaseUK" target="_blank" className="social-link_big fa fa-youtube-play" aria-hidden="true">
                    </a>
                    <a href="https://www.facebook.com/KerastaseUK" target="_blank" className="social-link_big fa fa-facebook" aria-hidden="true">
                    </a>

                </div>
                <div>

                </div>
                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>
                <div>
                    <div className="wrapperNext">
                        <div  className="linkText">Restart Diagnosis</div>
                        <Link to="/" className="linkArrow restart_image" ></Link>
                    </div>
                </div>
                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>
            </div>
        );
    }
});

module.exports = ShareDiagnosis;

