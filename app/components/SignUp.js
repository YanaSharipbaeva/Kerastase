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
import  '../styles/Main.css';
import  '../styles/SignUp.css';

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
            password: '<8mB3c,%^cu~72&3'
        }
    },

    handleChange: function(){
        this.setState({
            newsletter: !this.state.newsletter
        });
        console.log(this.state);
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

                            console.log(user);
                                _this.context.router.push('/start');
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

    render: function() {
        var text = 'Sign up';
        return (
            <div className="wrapperPhrase1">
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
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                        <Link className="linkArrow" to="/question/4">
                        </Link>
                </div>
            </div>
        );
    }
});

module.exports = SignUp;