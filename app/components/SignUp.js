'use strict';
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import SelectBox from 'react-select-box';

import Header from './Header';
import NextLink from './NextLink';
import ReactSelect from 'react-bootstrap-select';
import TitleComponent from './TitleComponent';

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
        console.log(this.props.location.state);


        this.state.questions = this.props.location.state.questions;
        this.state.answers = this.props.location.state.answers;
        this.state.questionTitles = this.props.location.state.questionTitles;
        this.state.answerTitles = this.props.location.state.answerTitles;

        this.getWinningProfiles(this.props.location.state);
    },

    componentWillMount(){
        $('#app').height('auto');
    },

    handleChange: function(){
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
        console.log('questionsSAVE', questions);
        console.log('profileBeforeSave', profiles);


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

            if (question.category === "DIAG") {
                var ponderation = question.ponderation;
                console.log("ponderation", ponderation);
                console.log("question", question);
                console.log("answer", answer);

                answer.profiles.forEach(function (profile) {
                    console.log(profile);
                    var key = profile.code;
                    console.log('key is', key);
                    if (stats.hasOwnProperty(key) === false) {
                        console.log('Has no key', key);
                        stats[key] = 0;
                    }

                    if (key === undefined) {
                        console.log(profile);
                    }

                    var currentValue = stats[key];
                    console.log('currentValue', currentValue);
                    var newValue = currentValue + (ponderation);
                    console.log('newValue', newValue);
                    stats[key]=newValue;
                    nativeProfiles[key]=profile;

                });
            }

            profiles.push(nativeProfiles[0]);
            profiles.push(nativeProfiles[1]);
            profiles.push(nativeProfiles[2]);
            console.log('profiles are ',stats);
            this.state.profiles = profiles;

            console.log('stats are ',stats);
            console.log('nativeProfiles are ', nativeProfiles);

        });


    },

    submitAndDisplay(){

       


        this.saveDiagnostic();

    },


    displayResult(){


    },



    changeHeight(){
        $('#app').height('100%');
    },

    render: function() {
        var text = 'Sign up';
        return (
            <div className="wrapperPhrase signUp-main-wrapper">
                <Header />
                <div className="wrapperTitle signUp">
                    <p className="questionTitle">k-profile</p>
                    <p className="questionTitle">SIGN UP</p>
                </div>
                <div className="question-text_wrapper question-wrapper signUp-wrapper">
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My name is</div>
                        <input  valueLink={this.linkState("name")} className="signUp-input" id="userName" type="text"></input>
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">I live in</div>
                        <ReactSelect className="signUp-input" ref="select" onChange={this.handleSelect}>
                            <option>UK</option>
                            <option>Germany</option>
                            <option>France</option>
                        </ReactSelect>
                    </div>
                    <div className="signUp-input_wrapper last">
                        <div className="signUp-input_text">My email is</div>
                        <input  valueLink={this.linkState("email")} className="signUp-input email" id="userEmail" type="text" ></input>
                    </div>
                    <div className="checkbox-wrapper">
                        <input  type="checkbox" 
                                className="checkbox" 
                                id="userNewsletter"
                                ref="complete"
                                />
                        <label  className="checkboxSignUp" 
                                onClick={this.handleChange}
                                htmlFor="userNewsletter">I would like to receive my hair diagnosis and the latest Kérastase news by email</label>
                    </div>
                </div>
                <div className="wrapperNext" >
                    <div className="linkText" onClick={this.displayResult}>Next</div>
                    <div className="linkArrow"  onClick={this.submitAndDisplay}></div>
                </div>
                <Link to="/" className="skipButton" onClick={this.displayResult}>skip</Link>
            </div>
        );
    }
});

module.exports = SignUp;