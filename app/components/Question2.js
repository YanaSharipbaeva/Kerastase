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


var Question2 = React.createClass({
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
        this.getAnswers('ozSM3igXSx', 'first');
        this.getAnswers('r0IbnW3wp0', 'second' );
        this.getAnswers('7RhOrbGGni', 'third' );
        this.getAnswers('asqvsXw4be', 'fourth' );
        this.getAnswers('2QfVi8YVhM', 'fifth' );
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

    onAnswerSelected(){
        var answers = [];
        $('.selectpicker li.selected').each(function () {
            answers.push($(this).text())
        });
    },

    render: function() {
        var text = 'tell us about yourself';
        return (
            <div className="wrapperPhrase">
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
                        <div className="wrapper-counter">
                            <Link to="/question/1" className="round"></Link> 
                            <HorizontalLine />
                            <Link to="/question/2" className="activeRound"></Link> 
                            <HorizontalLine />
                            <Link to="/question/3" className="round"></Link> 
                            <HorizontalLine />
                            <Link to="/question/4" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/5" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/6" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/7" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/8" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/9" className="round"></Link>
                            <HorizontalLine />
                            <Link to="/question/10" className="round"></Link>
                        </div>
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                        <Link className="linkArrow" to="/question/3">
                        </Link>
                    </div>
                </div>
        );
    }
});

module.exports = Question2;