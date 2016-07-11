'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from './Header';
import TitleComponent from './TitleComponent';
import NextLink from './NextLink';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import ReactSelect from 'react-bootstrap-select';

import '../styles/Question.css';
import '../styles/Main.css';

var ParseQuestions = Parse.Object.extend('Questions');


var Question1 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

     getInitialState() {
        return {
            pageNumber:'2',
            firstSelectOptions: [],
            secondSelectOptions: [],
            thirdSelectOptions: [],
            fourthSelectOptions: [],
            fifthSelectOptions: []
        };
    },

    componentWillMount() {
        this.getAnswers('Q2PKiGIjNy', 'first');
        this.getAnswers('Nj4thsyXB4', 'second' );
        this.getAnswers('LpEGWms9Ij', 'third' );
        this.getAnswers('74xfhZEQn0', 'fourth' );
        this.getAnswers('tfbP19tBc7', 'fifth' );
    },

    getAnswers(id, selectOption) {
        var _this = this;
        var query = new Parse.Query(ParseQuestions);
        query.equalTo('objectId', id);
        query.include('answers');
        query.first().then(
            (questions) => {
                var options = questions.get('answers'); 
                if (selectOption === 'first') {
                    _this.setState({
                        firstSelectOptions: options.map((option) => option.get('title'))
                    });
                }

                if (selectOption === 'second') {
                    _this.setState({
                        secondSelectOptions: options.map((option) => option.get('title'))
                    });
                }

                if (selectOption === 'third') {
                    _this.setState({
                        thirdSelectOptions: options.map((option) => option.get('title'))
                    });
                }

                if (selectOption === 'fourth') {
                    _this.setState({
                        fourthSelectOptions: options.map((option) => option.get('title'))
                    });
                }

                if (selectOption === 'fifth') {
                    _this.setState({
                        fifthSelectOptions: options.map((option) => option.get('title'))
                    });
                }
            
                }, (error) => {
                    console.log('Error getting products');
                    console.log(error);
                }
            ) 
    },

    render: function() {
        var text = 'tell us about yourself';
        return (
            <div className="wrapperPhrase1">
                <Header />
                <TitleComponent pageNumber={this.state.pageNumber} text={text}/>
                <div className="question-wrapper">
                    <div className="question-text_wrapper">
                        { this.state.firstSelectOptions.length !== 0 ?
                            <div className="question-text">My hair is
                                <ReactSelect>
                                    {this.state.firstSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>,
                                <ReactSelect>
                                    {this.state.secondSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>and
                                <ReactSelect>
                                    {this.state.thirdSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>
                            </div>
                        : null }
                        { this.state.firstSelectOptions.length !== 0 ?
                            <div className="question-text">My hair is
                                <ReactSelect>
                                    {this.state.fourthSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>and it's shape is
                                <ReactSelect>
                                    {this.state.fifthSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>
                            </div>
                        : null }
                    </div>
                    </div>
                    <div className="wrapper-counter">
                            <CounterRound />
                            <HorizontalLine />
                            <ActiveCounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                            <HorizontalLine />
                            <CounterRound />
                        </div>
                    {this.state.firstSelectOptions.length !== 0 ?
                        <NextLink link="/question/3"/>
                    : null }
                </div>
        );
    }
});

module.exports = Question1;