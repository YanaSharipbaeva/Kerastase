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
import { Modal } from 'react-bootstrap';
import Header from './Header';

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
                <div className="info-block_title">in-salon ritual</div>
                <div className="main-in-salon-wrapper row">
                    <div className="info-block image-block col-xs-2 .col-sm-2 .col-md-2 .col-lg-2 .col-xl-2">
                        <div className="info-block_wrapper">
                            <div className="info-image1"></div>
                            <div className="info-image2"></div>
                            <a href="http://salons.kerastase.co.uk/" target="_blank" className="salon_link">> Find your nearest salon</a>
                            
                        </div>
                    </div>
                    <div className="info-block text_block col-xs-10 .col-sm-10 .col-md-10 .col-lg-10 .col-xl-10">
                         <div className="text_wrapper">
                            <p className="result-title info-text_title">{this.state.profile.get("prescriptionServices")}</p>
                            <div className="description-wrapper">
                                <p className="info-text">{this.state.profile.get("descriptionService")}</p>
                                <div className="timeInSalon">20 MN</div>
                            </div>
                        </div>
                        <div className="text_wrapper">
                            <ul className="info-text">
                                <li>3 benefits of in-salon treatment:</li>
                                <li>1. Prescription: Your hairdresser applies the correct dosage tailored to your specific level of dryness.</li>
                                <li>2. Transformation: Hair is instantly suppler, shinier. You experience the Nutritive touch.</li>
                                <li>3. Extension: The treatment anchors nutrients inside the hair, even after several shampoos.</li>
                            </ul>
                        </div>
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

module.exports = InSalon;


