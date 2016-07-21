'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Pagination from './Pagination';
import Header from './Header';
import Start from './Start';
import NewQuestion from './NewQuestion';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import SignUp from './SignUp';
import Footer from "./Footer"

import { Modal } from 'react-bootstrap';
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


      if(Parse.user){

            this.openModal();
        }

        console.log('PROPS',  this.props.location.state);
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

    getTextColor(){
        var textColor = {
            color: '#' + this.state.profile.get('color')
        } 

        return textColor;
    },

    openModal () {
        this.setState({
            showModal: true
        });
    },

    closeModal () {
        this.setState({
            showModal: false
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
                        <div className="result-title result-text_red" style={this.getTextColor()}>{this.state.profile.get("profileBenefit")}</div>
                        <div className=" result-text_thin">{this.state.profile.get("profileDescription")}</div>
                        <Pagination pageNumber={this.state.pageNumber}/>
                        
                    </div>
                </div>

                <Footer onClick={this.nextPage} title="in-salon ritual"/>

                <div className="modal-wrapper">

                    <Modal show={this.state.showModal} className="signUp" sign-up-modal >
                        <Modal.Body >
                            <div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                            <p className="customersText">Thank you, an email was sent to your mailbox</p>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>
        );
    }
});

module.exports = Profile;


