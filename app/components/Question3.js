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
import '../styles/CheckBox.css';

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
            selectOptions: [],
            firstSelectOptions: [],
        };
    },

    componentWillMount() {
        this.getAnswers('SKk7ZBXgUt', 'first');
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

                }, (error) => {
                    console.log('Error getting products');
                    console.log(error);
                }
            ) 
    },

     
    render: function() {
        var text = 'If you had to choose one, what would be you main hair concern today ?';
        var firstSelectOptions = this.state.firstSelectOptions;
        var arrayFirstHalf = [];
        var arraySecondHalf = [];
        var el;
        for (var i=0; i< Math.ceil(firstSelectOptions.length / 2); i++) { 
            el = <div className="checkOption">
                    <input type="checkbox" className="checkbox" id={firstSelectOptions[i]}/>
                    <label className="checkboxLabel" htmlFor={firstSelectOptions[i]}>{firstSelectOptions[i]}</label>
                </div> 
            arrayFirstHalf.push(el);                
        }

        for (  var j = Math.ceil(firstSelectOptions.length / 2); j < firstSelectOptions.length; j++) {
            console.log(Math.ceil(firstSelectOptions.length / 2));
            el = <div className="checkOption">
                    <input type="checkbox" className="checkbox" id={firstSelectOptions[j]}/>
                    <label className="checkboxLabel" htmlFor={firstSelectOptions[j]}>{firstSelectOptions[j]}</label>
                </div>   
            arraySecondHalf.push(el);                
        }

        return (
            <div className="wrapperPhrase1">
                <Header />
                <TitleComponent pageNumber={this.state.pageNumber} text={text}/>
                <div className="question-wrapper">
                    <div className="question-text_wrapper multiple">
                        <div className="question-text checkOption-wrapper"> 
                            {arrayFirstHalf}  
                        </div> 
                        <div className="question-text checkOption-wrapper"> 
                            {arraySecondHalf}  
                        </div>                       
                    </div>
                </div>
                <div className="wrapper-counter">
                    <CounterRound />
                    <HorizontalLine />
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
                </div>
                <NextLink link="/question/4"/>
            </div>
        );
    }
});

module.exports = Question3;