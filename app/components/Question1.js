'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
    

var ReactDom = require('react-dom');


import Header from './Header';
import TitleComponent from './TitleComponent';
import NextLink from './NextLink';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';

import '../styles/Question.css';
import '../styles/Main.css';

var ParseQuestions = Parse.Object.extend('Questions');
import ReactSelect from 'react-bootstrap-select';

var Question1 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber:'1',
            firstSelectOptions: [],
            secondSelectOptions: [],
            thirdSelectOptions: [],
            fourthSelectOptions: [],
            firstAnswer:'',
            secondAnswer:'',
            thirdAnswer:'',
            fourthAnswer:'',
            selectedAnswers:[]

        };
    },

    componentWillMount() {
        this.getAnswers('NGuISdWXsl', 'first');
        this.getAnswers('nDj3w893Et', 'second' );
        this.getAnswers('uuxfXLJGO8', 'third' );
        this.getAnswers('jmjjFVdZkK', 'fourth' );


    },

    onAnswerSelected (event) {
        alert('ff')
        var selectedAnswers = this.state.selectedAnswers;
        selectedAnswers.push(event.target.value);
        console.log(event.target.value);
        //console.log(this.getProductByName(event.target.value));
        //console.log(selectedProducts);
        this.setState({
            selectedAnswers: selectedAnswers
        });
        console.log(this.state.selectedAnswers);
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
                    <div  className="question-wrapper">
                        <form className="question-text_wrapper">
                            <fieldset>
                                { this.state.firstSelectOptions.length !== 0 ?
                                    <div className="question-text">I am a   
                                        <select className="selectAnswer" ref="select" onChange={this.onAnswerSelected}>
                                            {this.state.firstSelectOptions.map(function(option, index) {
                                                return <option key={index}   value={option} >{option}</option>        
                                            })}
                                        </select >
                                        
                                        between
                                        <ReactSelect onChange={this.onAnswerSelected}>
                                            {this.state.secondSelectOptions.map(function(option, index) {
                                                return <option key={index}  value={option} >{option} years old</option>        
                                            })}
                                        </ReactSelect>
                                    </div>
                                : null }

                                {this.state.firstSelectOptions.length !== 0 ?
                                    <div className="question-text">I live in 
                                        <ReactSelect onChange={this.onAnswerSelected}>
                                            {this.state.thirdSelectOptions.map(function(option, index) {
                                                return <option key={index} value={option} >{option}</option>        
                                            })}
                                        </ReactSelect>
                                        and I visit a salon every
                                        <ReactSelect onChange={this.onAnswerSelected}>
                                            {this.state.fourthSelectOptions.map(function(option, index) {
                                                return <option key={index}  value={option} >{option}</option>        
                                            })}
                                        </ReactSelect>

                                    </div>


                                : null }
                                <input type="submit" value="send" />
                            </fieldset>
                             
                        </form>
                        <div className="wrapper-counter">
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
                            <HorizontalLine />
                            <CounterRound />
                        </div>
                    </div>
                {this.state.firstSelectOptions.length !== 0 ?
                    <NextLink link="/question/2"/>
                : null }
            </div>
        );
    }
});

module.exports = Question1;