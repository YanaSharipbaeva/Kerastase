'use strict';
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import SelectBox from 'react-select-box';
import { Modal } from 'react-bootstrap';
import Header from './Header';
import NextLink from './NextLink';
import ReactSelect from 'react-bootstrap-select';
import TitleComponent from './TitleComponent';
var Validation = require('react-validation');
var validator = require('validator');

var ParseUsers = Parse.Object.extend('User');
var ParseDiagnostic = Parse.Object.extend('Diagnostic');
import  '../styles/Main.css';
import  '../styles/SignUp.css';
import '../styles/Media.css';

var SignUp = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

     getInitialState: function () {
        return {
            name: '',
            country: '',
            email:'',
            newsletter: true,
            password: '<8mB3c,%^cu~72&3',
            questions:[],
            answers:[],
            questionTitles:[],
            answerTitles:[]

        }
    },

    componentDidMount(){
        console.log(this.props);
        $('#app').addClass('QCM-long');

        this.state.questions = this.props.location.state.questions;
        this.state.answers = this.props.location.state.answers;
        this.state.questionTitles = this.props.location.state.questionTitles;
        this.state.answerTitles = this.props.location.state.answerTitles;

        this.getWinningProfiles(this.props.location.state);

        Validation.extendErrors({
            isEmail: {
                className: 'ui-input_state_email-pattern-failed',
                // validator already has strong email-pattern, so we don't have to extend it by custom 
                message: ''
            }
        });
    },

    OnNewsletter: function(){
        this.setState({
            newsletter: !this.state.newsletter
        });
        console.log(this.state);
    },

    saveDiagnostic() {
        var diagnostic = new ParseDiagnostic();

        var questions = this.state.questions;
        var answers = this.state.answers;
        var questionTitles = this.state.questionTitles;
        var answerTitles = this.state.answerTitles;
        var profiles = this.state.profiles;


        diagnostic.set('questions', questions);
        diagnostic.set('questionTitles', questionTitles);
        diagnostic.set('answers', answers);
        diagnostic.set('answerTitles', answerTitles);
        diagnostic.set('profiles', profiles);
        diagnostic.set('type', 'consumer');
        diagnostic.set('user', Parse.User.current());

        diagnostic.save(null).then(
            (diagnostic) => {
                console.log('Diagnostic Object was successfully saved');
            }, (error) => {
                console.error('Error saving diagnostic');
                console.error(error);
            });
    },

    signUp: function (e) {
        e.preventDefault();
        var _this = this;
        var query = new Parse.Query(Parse.User);
            
        query.equalTo('email', this.state.email);
        query.first({

            success: function(user) {  
                //if user does not exist, we create a new user and sign up him
                if (user === undefined) {
                    var newUser = new Parse.User();
                    newUser.set("username", _this.state.email);
                    newUser.set("name", _this.state.name);
                    newUser.set("newsletter", _this.state.newsletter);
                    newUser.set("email", _this.state.email);
                    newUser.set("password", _this.state.password);
                    console.log(newUser);
                    newUser.signUp(null, {
                        success: function(newUser) {
                            console.log('Sign up is successful');
                        },
                        error: function(newUser, error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });
                } else {
                    // if user is exist, then log in
                    Parse.User.logIn(user.get('username'), _this.state.password, {
                        success: (user) => {
                            user.set("name", _this.state.name);
                            user.set("newsletter", _this.state.newsletter);
                            user.save();


                        },
                        error: (user, error) => {
                            alert('Error ' + error.message);
                            console.log(error);
                        }
                    });
                    console.log('success');
                }
            },
            error: (error) => {
                console.log(error);
                consoel.log('error saving user');
            }
   
        });
    },

    getWinningProfiles(data){
        var profiles = [];
        var stats = {};
        var nativeProfiles = {};
        data.answers.forEach(function (answer, index) {
            var question = data.questions[index];

            if (question.get('category') === "DIAG") {
                var ponderation = question.get('ponderation');

                answer.get('profiles').forEach(function (profile) {
                    var key = profile.get('code');
                    if (stats.hasOwnProperty(key) === false) {
                        console.log('Has no key', key);
                        stats[key] = 0;
                    }

                    if (key === undefined) {
                        console.log(profile);
                    }

                    var currentValue = stats[key];
                    var newValue = currentValue + (ponderation);
                    stats[key]=newValue;
                    nativeProfiles[key]=profile;


                });
            }






            // profiles.push(nativeProfiles[1]);
            // profiles.push(nativeProfiles[2]);
            // console.log('profiles are ',profiles);
            // console.log(profiles);

          

            // console.log('stats are ',stats);
            // console.log('nativeProfiles are ', nativeProfiles);

            });

        console.log("sorted profiles",sortedKeys);
        var sortedKeys = this.getSortedKeys(stats);
        console.log('stats are ',stats);


        var finalArray=[];

        var lockValue = 0;

        let index = sortedKeys.indexOf("undefined");
        if(index !== -1) {
            sortedKeys.splice(index, 1);
            console.log("WARNING : UNDEFINED VALUES FOR PONDERATION HAVE BEEN FOUND");
        }
        console.log("sortedKeys",sortedKeys);
        sortedKeys.forEach(function (key, index) {
            var originalValue=stats[key];

            if(lockValue == 0)
            {
                lockValue = originalValue;
            }

            if(originalValue == lockValue && index <= 2)
            {
                profiles.push(nativeProfiles[key]);

            }

        });



            console.log('STATS', data.answers);
            profiles.push(data.answers[0].get('profiles')[0]);


            console.log('PROFILES', profiles);
            this.setState({
                profiles: profiles
            });
    },


    getSortedKeys(obj) {
        var keys = []; for(var key in obj) keys.push(key);
        return keys.sort(function(a,b){return obj[b]-obj[a]});
    },

    displayResult(){
        console.log('RESULT',  this.state);
        this.context.router.push({
            pathname: '/profile',
            state: { 
                    profiles: this.state.profiles
                }
            });

    },


    skipAndDisplay(){
        this.displayResult();
    },

    submitAndDisplay: function(event) {
        event.preventDefault();
   
        if (this.refs.form._validations.email) {
            this.saveDiagnostic();
            this.displayResult();
            console.log(this.state);
        } else {
            this.openModal();
        }
    },

    changeHeight(){
        $('#app').height('100%');
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
        var text = 'Sign up';
        return (
            <div>
            <Validation.Form  onSubmit={this.submitAndDisplay} ref='form' className="wrapperPhrase signUp-main-wrapper">
                <Header />
                <div className="wrapperTitle signUp">
                    <p className="questionTitle">k-profile</p>
                    <p className="questionTitle">SIGN UP</p>
                </div>
                <div className="question-text_wrapper question-wrapper signUp-wrapper">
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My name is</div>
                        <input type="text" className="signUp-input" />
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My surname is</div>
                        <input type="text" className="signUp-input" />
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">I live in</div>
                        <ReactSelect className="signUp-input" id="signUp-input" ref="select">
                            <option>UK</option>
                            <option>Germany</option>
                            <option>France</option>
                        </ReactSelect>
                    </div>
                    <div className="signUp-input_wrapper last">
                        <div className="signUp-input_text email_title">My email is</div>
                        <Validation.Input 
                            className='signUp-input email'
                            validations={[
                                {
                                    rule: 'isEmail'
                                }
                            ]}
                            name='email'
                            type='text'
                      
                            />
                    </div>
                    <div className="checkbox-wrapper">
                        <input  type="checkbox" 
                                className="checkbox" 
                                id="userNewsletter"
                                ref="complete"
                                />
                        <label  className="checkboxSignUp" 
                                onClick={this.OnNewsletter}
                                htmlFor="userNewsletter">I would like to receive my hair diagnosis and the latest Kérastase news by email</label>
                    </div>
                </div>
                <div className="wrapperNext" >
                    <div  className="linkText" value="Next">Next</div>
                    <input className="linkArrow"   onClick={this.submitAndDisplay}></input>
                </div>
                <div  className="skipButton" onClick={this.skipAndDisplay}>skip</div>
            </Validation.Form >
            <div className="modal-wrapper">
                <Modal show={this.state.showModal} className="signUp" sign-up-modal onHide={this.closeModal}>

                    <Modal.Body >
                        <div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <p className="customersText">Please, enter correct email address</p>
                    </Modal.Body>
                </Modal>
            </div>
            </div>
        );
    }
});

module.exports = SignUp;