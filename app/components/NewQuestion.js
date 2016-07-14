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
import '../styles/Media.css';


var ParseQuestions = Parse.Object.extend('Questions');
import NewComponent from 'react-bootstrap-select';
    
var NewQuestion = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber:0,
            dataSource:[ ],
            savedData:[]
        };
    },

    componentWillMount() {
        this.getAnswers();
    },

    onAnswerSelected(){
        this.state.pageNumber++

        console.log(this.state.pageNumber);
    },

    getAnswers() {
        var _this = this;
        var hardCodedDataQuery,
            dynamicDataQuery;

        var objectIdsArray = ["VGF1UCoZU5", "oWlblkHGpC", "cJBGsiHH1Y", 
                        "DNigZ6egMc", "r0IbnW3wp0", "asqvsXw4be", "ozSM3igXSx", "2QfVi8YVhM",
                  "7RhOrbGGni", "ausAe1ZaIK", "WS2RGxVAKk", "aBeKdLM3E1", "VaP4llxFOs", "kGTNTx95ds"];


      


        hardCodedDataQuery = new Parse.Query(ParseQuestions),
        hardCodedDataQuery.containedIn("objectId", objectIdsArray);
        hardCodedDataQuery.include('answers');

        dynamicDataQuery = new Parse.Query(ParseQuestions);
        dynamicDataQuery.notContainedIn("objectId", objectIdsArray);
        dynamicDataQuery.notEqualTo('type', 'pro');
        dynamicDataQuery.ascending('positionConsumer')
        dynamicDataQuery.include('answers');
        
        hardCodedDataQuery.find().then(
            (hardCodedQuestions) => {
                console.log('hardCodedQuestions');
               // console.log(JSON.stringify(hardCodedQuestions));
                console.log(hardCodedQuestions);

                dynamicDataQuery.find().then(
                    (dynamicQuestions) => {
                    console.log('dynamicQuestions');
                    //console.log(JSON.stringify(dynamicQuestions));
                    //console.log(dynamicQuestions);
                     var arr = _this.buildDataSource(hardCodedQuestions,dynamicQuestions);
                     console.log('before set state', arr);
                     _this.setState({
                        dataSource: arr
                     })

                    }, (error) => {
                        console.log('Error getting products');
                        console.log(error);
                    }
                )
            }

        )
     
    },

    buildDataSource: function (hardCodedQuestions, dynamicQuestions) {
        var tempArray = [[], [], [], []];
        console.log('build datasourceBegin');
        console.log(hardCodedQuestions);
        
        hardCodedQuestions.forEach(function (hardCodedQuestion, index) {
           console.log(index);
            switch (index) {
                case 0:
                    hardCodedQuestion.text="I am a ";
                    tempArray[0].push(hardCodedQuestion);
                
                break
                case 1:
                    hardCodedQuestion.text="between ";
                    tempArray[0].push(hardCodedQuestion);
                break
                case 2:
                    hardCodedQuestion.text="/I live in ";
                    tempArray[0].push(hardCodedQuestion);
                break
                case 3:
                    hardCodedQuestion.text="and I visit a salon every ";
                    tempArray[0].push(hardCodedQuestion);
                break
                case 4:
                    hardCodedQuestion.text="the world, your hair lives in ";
                    tempArray[0].push(hardCodedQuestion);
                break
                case 5:
                    hardCodedQuestion.text="My hair is ";
                    tempArray[1].push(hardCodedQuestion);
                break
                case 6:
                    hardCodedQuestion.text=", ";
                    tempArray[1].push(hardCodedQuestion);
                break
                case 7:
                    hardCodedQuestion.text="and ";
                    tempArray[1].push(hardCodedQuestion);
                break
                case 8:
                    hardCodedQuestion.text="My hair is ";
                    tempArray[1].push(hardCodedQuestion);
                break
                case 9:
                    hardCodedQuestion.text="and it's shape is";
                    tempArray[1].push(hardCodedQuestion);
                break
                case 10:
                    hardCodedQuestion.text="/I wash my hair ";
                    tempArray[2].push(hardCodedQuestion);
                break
                case 11:
                    hardCodedQuestion.text=", ";
                    tempArray[2].push(hardCodedQuestion);
                break
                case 12:
                    hardCodedQuestion.text="and I";
                    tempArray[2].push(hardCodedQuestion);
                break
                case 13:
                    hardCodedQuestion.text="/I wish ";
                    tempArray[3].push(hardCodedQuestion);
                break
                case 14:
                    hardCodedQuestion.text="another desire: ";
                    tempArray[3].push(hardCodedQuestion);
                break
            }

        });

        console.log(hardCodedQuestions);

        dynamicQuestions.splice(0, 0, tempArray[0]); 
        dynamicQuestions.splice(1, 0, tempArray[1]);
        dynamicQuestions.splice(2, 0, tempArray[2]);
        dynamicQuestions.splice(8, 0, tempArray[3]);

        console.log('built array');
        console.log(dynamicQuestions);

        dynamicQuestions.forEach(function(item){
            console.log($.isArray(item));
        });

        return dynamicQuestions;


    },

    getSentences() {
        console.log('getSentences');
        console.log('data', this.state.dataSource);
        var obj = [];
        var elem;
        var answers;
        var data = this.state.dataSource[this.state.pageNumber];
        data.forEach(function(item, index) {
            console.log(item.get('answers'));
            elem = <span>
                    <span className="question-text">{item.text}</span>
                
                    <ReactSelect  className="selectAnswer">
                        {item.get('answers').map(function(option, index) {
                            return <option key={index}  value={option}>{option.get('title')}</option>   
                        })}                                         
                    </ReactSelect> 
                    </span>
            obj.push(elem) 
        });

        return obj;
    },

    getQCM(){
        var el;
        var obj=[];
        var data = this.state.dataSource[this.state.pageNumber];

        el = <div className="checkOption" >
                    <input type="checkbox" className="checkbox" id={1}/>
                    <label className="checkboxLabel"  htmlFor={1}>
                        text 
                    </label>
                </div> 

            obj.push(el); 
        

    },

    nextPage(){
        console.log('getQCM');
        this.setState({
            pageNumber:this.state.pageNumber+1
        });
        console.log(this.state.pageNumber);
    },

    getQCMOrSentences(){
        console.log('getQCMOrSentences')
        var item = this.state.dataSource[this.state.pageNumber];
        console.log('item', item);

        if ($.isArray(item)) {
            return this.getSentences();
        } else {
           return this.getQCM();
        }
    },

    render: function() {
         console.log('render')
        var text = 'tell us about yourself';

        if (this.state.dataSource.length===0) {
            return null
        } else {
            return (
                <div className="wrapperPhrase">
                    <Header />
                    <TitleComponent pageNumber={this.state.pageNumber} text={text}/>
                    <div  className="question-wrapper">
                        <div className="question-text_wrapper" >
                        
                            {this.getQCMOrSentences()}
                                
                        </div>
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                        <div className="linkArrow"  onClick={this.nextPage}>
                        </div>
                    </div>
                   
                </div>
            );
        }
    }
});

module.exports = NewQuestion;

