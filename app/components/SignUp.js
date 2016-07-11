'use strict';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from './Header';
import NextLink from './NextLink';
import ReactSelect from 'react-bootstrap-select';
import TitleComponent from './TitleComponent';

import  '../styles/Main.css';
import  '../styles/SignUp.css';

var SignUp = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    
    render: function() {
        var text = 'Sign up';
        return (
            <div className="wrapperPhrase1">
                <Header />
                <TitleComponent  text={text}/>
                <div className="question-text_wrapper question-wrapper signUp-wrapper">
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">My name is</div>
                        <input  className="signUp-input" type="text"></input>
                    </div>
                    <div className="signUp-input_wrapper">
                        <div className="signUp-input_text">I live in</div>
                        <ReactSelect className="signUp-input">
                            <option>UK</option>
                            <option>USA</option>
                        </ReactSelect>
                    </div>
                    <div className="signUp-input_wrapper last">
                        <div className="signUp-input_text">My email is</div>
                        <input  className="signUp-input email" type="text"></input>
                    </div>
                    <input type="checkbox" className="checkbox" id="resultSubmit"/>
                    <label className="checkboxSignUp" htmlFor="resultSubmit">I would like to receive my hair diagnosis and the latest Kérastase news by email</label>
                </div>
                <NextLink link="/question/4"/>
            </div>
        );
    }
});

module.exports = SignUp;