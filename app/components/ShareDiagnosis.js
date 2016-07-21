'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';

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
        var mail=null;
        var user=Parse.User.current();

        if(user) {
            mail = user.getEmail();
        }

        return {
            mail:mail,
            pageNumber: 4,
            result: [],
            email:''
        };
    },

    componentWillMount() {
  
        console.log('PROPS',  this.props.location.state);
        this.state.profile = this.props.location.state.profile;
        this.state.products = this.props.location.state.products;
        console.log("PRODUCTS" , this.state.products);

        //this.shareEmail();
    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 5; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    shareEmail(){
        console.log('share');

        //var ids = ["wPa2OeiE7h","KzVaAYDa4T","bW9JNDKImY"];


        var params = {"profiles":[this.state.profile.objectId],  "userEmail" :this.state.email};


        console.log('PARAMS', params)

        Parse.Cloud.run('sendEmailToUser', params, {
            success: function(result) {

                console.log("sendEmailToUser succes");
            },
            error: function(error) {
                console.log("sendEmailToUser",error)
            }
        });
        this.closeModal();
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

    sendEmail () {
        console.log("USER", Parse.User.current());
         var currentUser = Parse.User.current();
         console.log(this.state.email)
         if (currentUser) {
             this.state.email=currentUser.getEmail();
         console.log('do stuff with the user',currentUser.getEmail());
             this.shareEmail()
         } else {
             this.openModal();
         }
    },

    getEmail (e){
        this.state.email = e.target.value;
    },

    render: function() {
        return (
            <div className="wrapper-in-salon_ritual reseiveByEmail">
                <Header /> 
                <div className="info-block_title">Receive by email</div>
                <div className="result4-text_info result5-text_info">Keep your personal routine recommendation handy by saving it in your inbox.</div>
                <div onClick={this.sendEmail} className="result-send">Send </div>
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
                <Modal show={this.state.showModal} onHide={this.closeModal} className="modalShareDiagnostics">

                    <Modal.Body>
                        <div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <div className="confirm-modal">
                            <div className="customersText"> Please, write down your email address, and press the confirm button</div>
                            <input className="email-field" onChange={this.getEmail} type="text" placeholder="Enter your email"></input>
                            <button className="confirmButton" onClick={this.shareEmail}>Save</button>
                        </div>
                    </Modal.Body> 
                </Modal>
            </div>
        );
    }
});

module.exports = ShareDiagnosis;


