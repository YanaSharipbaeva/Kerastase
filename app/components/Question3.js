'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Header from './Header';
import TitleComponent from './TitleComponent';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import ReactSelect from 'react-bootstrap-select';

import '../styles/Question.css';
import '../styles/Main.css';
import '../styles/Media.css';

var ParseQuestions = Parse.Object.extend('Questions');


var Question3 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

     getInitialState() {
        return {
            pageNumber:'3',
            firstSelectOptions: [],
            secondSelectOptions: [],
            thirdSelectOptions: [],
            answers:[]
        };
    },

    componentWillMount() {
        this.getAnswers('ausAe1ZaIK', 'first');
        this.getAnswers('WS2RGxVAKk', 'second' );
        this.getAnswers('aBeKdLM3E1', 'third' );
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
        this.setState({
            answers:answers
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
                            <div className="question-text">I wash my hair
                                <ReactSelect>
                                    {this.state.firstSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>,
                                <ReactSelect>
                                    {this.state.secondSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>and I
                                <ReactSelect>
                                    {this.state.thirdSelectOptions.map(function(option, index) {
                                        return <option key={index} value={option} >{option}</option>        
                                    })}
                                </ReactSelect>
                            </div>
                        : null }
                    </div>
                    
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                        <Link className="linkArrow" to="/question/4">
                        </Link>
                    </div>
                    <div className="wrapper-counter">
                        <Link to="/question/1" className="round"></Link> 
                        <HorizontalLine />
                        <Link to="/question/2" className="round"></Link> 
                        <HorizontalLine />
                        <Link to="/question/3" className="activeRound"></Link> 
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
        );
    }
});

module.exports = Question3;