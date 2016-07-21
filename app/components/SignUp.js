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
import Pagination from './Pagination';
import ReactSelect from 'react-bootstrap-select';
import TitleComponent from './TitleComponent';
var Validation = require('react-validation');
var validator = require('validator');

var ParseUsers = Parse.Object.extend('User');
var ParseDiagnostic = Parse.Object.extend('Diagnostic');
import  '../styles/Main.css';
import  '../styles/SignUp.css';
import '../styles/Media.css';
import Footer from "./Footer"
var SignUp = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

     getInitialState: function () {
         var mail="";
         var name=";"
         var surname="";
         var country="UK";
         var newsletter=true;

         if(Parse.User.current())
         {
             var user=Parse.User.current();
             var mail=user.getEmail();
             var name = user.get("firstName");
             var surname = user.get("lastName");
             var country = user.get("country");
             var newsletter = user.get("newsletter");

         }



        return {
            name: name,
            surname:surname,
            country: country,
            email:mail,
            newsletter: newsletter,
            password: '<8mB3c,%^cu~72&3',
            questions:[],
            answers:[],
            questionTitles:[],
            answerTitles:[]

        }
    },

    componentDidMount(){
        console.log(this.props);
  
      // $('#app').addClass('QCM-long');

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

        console.log("saving diagnostic");
        var diagnostic = new ParseDiagnostic();

        var questions = [];

        console.log("questions are",this.state.questions);

        console.log("answers are",this.state.answers);



        this.state.questions.forEach(function (question) {
            if(question instanceof Parse.Object==false){
                question.className = "Question";
                question =  Parse.Object.fromJSON(question);
            }
            questions.push(question.toPointer());





        });

        var answers = [];

        this.state.answers.forEach(function (answer) {
            if(answer instanceof Parse.Object==false){

                answer.className = "Answer";
                answer =  Parse.Object.fromJSON(answer);


            }
            answers.push(answer.toPointer());

        });


        console.log("after saving to pointers");

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

        console.log("before saving remote diagnostic",diagnostic);

        var _this = this;
        diagnostic.save(null).then(
            (diagnostic) => {
                console.log('Diagnostic Object was successfully saved');
                _this.displayResult();
            }, (error) => {
                console.error('Error saving diagnostic',error);
                console.error(error);
            });
    },

    signUp: function (e) {

        console.log("signup");
        e.preventDefault();
        var _this = this;
        var query = new Parse.Query(Parse.User);
            
        query.equalTo('email', this.state.email);
        console.log("check this mail",this.state.email);

        query.first({

            success: function(user) {  
                //if user does not exist, we create a new user and sign up him
                if (user === undefined) {
                    var newUser = new Parse.User();
                    newUser.set("username", _this.state.email);
                    newUser.set("firstName", _this.state.name);
                    newUser.set("lastName", _this.state.surname);
                    newUser.set("newsletter", _this.state.newsletter);
                    newUser.set("email", _this.state.email);
                    newUser.set("country", _this.state.country);
                    newUser.set("password", _this.state.password);
                    console.log("NEW USER", newUser);
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
                    //Parse.User.logIn(user.get('username'), _this.state.password, {
                    //    success: (user) => {
                    //        user.set("name", _this.state.name);
                    //        user.set("newsletter", _this.state.newsletter);
                    //        user.save();
                    //
                    //        this.saveDiagnostic();
                    //
                    //
                    //    },
                    //    error: (user, error) => {
                    //        alert('Error ' + error.message);
                    //        console.log(error);
                    //    }
                    //});

                    _this.saveDiagnostic();

                    console.log('success');
                }
            },
            error: (error) => {
                console.log(error);
                console.log('error saving user');
            }
   
        });
    },

    getWinningProfiles(data){
        var profiles = [];
        var stats = {};
        var nativeProfiles = {};
        data.answers.forEach(function (answer, index) {
            var question = data.questions[index];

            console.log("question is ",question);


            if(question instanceof Parse.Object==false){
                question.className = "Question";
                question =  Parse.Object.fromJSON(question);
            }

            if(answer instanceof Parse.Object==false){

                answer.className = "Answer";
                answer =  Parse.Object.fromJSON(answer);


            }


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

            var _answer = data.answers[0];

        if(_answer instanceof Parse.Object==false){

            _answer.className = "Answer";
            _answer =  Parse.Object.fromJSON(_answer);


        }
            profiles.push(_answer.get('profiles')[0]);



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
        Parse.User.logOut();
        this.displayResult();
    },

    submitAndDisplay: function(event) {
        event.preventDefault();
   
        if (this.refs.form._validations.email&&this.refs.form._validations.name&&this.refs.form._validations.surname) {
            this.state.email=this.refs.email.getElement().value;
            this.state.name=this.refs.name.getElement().value;
            this.state.surname=this.refs.surname.getElement().value;
            this.state.country=this.refs.country.getElement().value;
            this.state.newsletter=this.refs.newsletter.checked;
            console.log("inspecting state",this.state);
            this.signUp(event);
            console.log(this.state);
        } else {
            this.openModal();
        }
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
            <div className="main-form-wrapper">
            <Validation.Form  onSubmit={this.submitAndDisplay} ref='form' className="wrapperPhrase signUp-main-wrapper">
                <Header />
                <div className="wrapperTitle signUp">
                    <p className="questionTitle">k-profile</p>
                    <p className="questionTitle">SIGN UP</p>
                </div>
                <div className="question-text_wrapper question-wrapper signUp-wrapper">
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My name is</div>
                        <Validation.Input

                            className='signUp-input'
                            validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]}
                            name='name'
                            ref='name'
                            value={this.state.name}
                            type='text'/>
                  />
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My surname is</div>

                        <Validation.Input

                            className='signUp-input'
                            validations={[
                        {
                            rule: 'isRequired'
                        }
                    ]}
                            name='surname'
                            value={this.state.surname}
                            ref='surname'
                            type='text'/>
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">I live in</div>

                        <Validation.Select value={this.state.country} ref='country' validations={[{rule: 'isRequired'}]} name='country' className='signUp-input'>
                            <option>UK</option>
                            <option>Germany</option>
                            <option>France</option>
                        </Validation.Select>
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
                            value={this.state.email}
                            ref='email'
                      
                            />
                    </div>
                    <div className="checkbox-wrapper">

                        <input  type="checkbox"
                                className="checkbox"
                                id="userNewsletter"

                                ref='newsletter'
                                />
                        <label  className="checkboxSignUp" 
                                onClick={this.OnNewsletter}
                                htmlFor="userNewsletter">I would like to receive my hair diagnosis and the latest Kérastase news by email</label>
                    </div>
                </div>
                
            </Validation.Form >

                <Footer onClick={this.submitAndDisplay} title="Next"/>
            <div className="modal-wrapper">
                <Modal show={this.state.showModal} className="signUp" sign-up-modal >
                    <Modal.Body >
                        <div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <p className="customersText">Please, enter correctly all information to continue</p>
                    </Modal.Body>
                </Modal>
            </div>

                <div  className="skipButton" onClick={this.skipAndDisplay}>skip</div>
            </div>
        );
    }
});

module.exports = SignUp;