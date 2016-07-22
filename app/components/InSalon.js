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
import Pagination from './Pagination';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import { Modal } from 'react-bootstrap';
import Header from './Header';
import Footer from "./Footer";
import Social from "./Social"
require('../styles/Main.css');
require('../styles/Result.css');

var InSalon = React.createClass({
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
        console.log("componentWillMount",this.props.location.state);

        var profile = this.props.location.state.profile;


        if (profile instanceof Parse.Object==false){

            profile.className = "Profile";
            profile =  Parse.Object.fromJSON(profile);
        }

        this.state.profile = profile;
        var _this = this;
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
    },

    componentDidMount() {

    },  

    nextPage(){
        console.log('nextPage');
        this.context.router.push({
            pathname: '/at-home',
            state: { 
                    profile: this.state.profile,
                    products:this.state.products
                }
        });
    },

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual result2 container">
                <Header />
                <div className="info-block_title">In-salon ritual</div>
                <div className="main-in-salon-wrapper row">
                    <div className="info-block image-block col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div className="info-block_wrapper">
                            <div className="info-image1"></div>
                            <div className="info-image2"></div>
                            <a href="http://salons.kerastase.co.uk/" target="_blank" className="salon_link">> Find your nearest salon</a>
                            
                        </div>
                    </div>
                    <div className="info-block text_block col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                         <div className="text_wrapper">
                          <div className="description-wrapper">
                                <p className="result-title info-text_title">{this.state.profile.get("prescriptionServices")}</p>
                                <p className="info-text col-xs-12 col-sm-12">{this.state.profile.get("descriptionService")}</p>
                            </div>
                             <div className="timeInSalon col-xs-12 col-sm-12">{this.state.profile.get("salonTimer")} MN</div>
                        </div>
                        <div className="text_wrapper">

                        </div>
                    </div>

                </div>
                <div className="row wrapper-footer-social">
                    <Footer onClick={this.nextPage} title="At-Home program"/>
                    <Social/>
                </div>
                <Pagination pageNumber={this.state.pageNumber}/>
            </div>
        );
    }
});

module.exports = InSalon;


