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

import '../styles/Question.css';
import '../styles/Main.css';
import '../styles/Media.css';

var ParseQuestions = Parse.Object.extend('Questions');
import ReactSelect from 'react-bootstrap-select';
    
var Question9 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber:'9',
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
        this.getAnswers('VaP4llxFOs', 'first');
        this.getAnswers('kGTNTx95ds', 'second' );
    },

    onAnswerSelected (event) {
        console.log(event);
        var selectedAnswers = this.state.selectedAnswers;
        selectedAnswers.push(event.target.value);
        console.log(event.target.value);
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
                    <div  className="question-wrapper">
                        <div className="question-text_wrapper" ref="select">
                                { this.state.firstSelectOptions.length !== 0 ?
                                    <div className="question-text">I wish                                       
                                        <ReactSelect className="selectAnswer">
                                            {this.state.firstSelectOptions.map(function(option, index) {
                                                return <option key={index}   value={option} >{option}</option>        
                                            })}                                         
                                        </ReactSelect > 
                                        another desire:
                                        <ReactSelect onChange={this.onAnswerSelected} >
                                            {this.state.secondSelectOptions.map(function(option, index) {
                                                return <option key={index}  value={option} >{option} years old</option>        
                                            })}
                                        </ReactSelect>
                                    </div>
                                : null }                         
                        </div>
                        <div className="wrapper-counter">

                            <Link to="/question/1" className="round"></Link> 
                            <HorizontalLine />
                            <Link to="/question/2" className="round"></Link> 
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
                            <Link to="/question/9" className="activeRound"></Link>
                            <HorizontalLine />
                            <Link to="/question/10" className="round"></Link>
                        </div>
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                        <Link className="linkArrow" to="/question/10">
                        </Link>
                    </div>
            </div>
        );
    }
});

module.exports = Question9;