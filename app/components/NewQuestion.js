'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';


import Header from './Header';
import TitleComponent from './TitleComponent';
import NextLink from './NextLink';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import ReactSelect from 'react-bootstrap-select';

import '../styles/Question.css';
import '../styles/Checkbox.css';
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
            questions:[],
            answers:[],
            questionTitles:[],
            answerTitles:[],
            profilesArray:[],
            QCMtext:''
        };
    },

    componentDidMount() {

            $('#app').height('auto');
    
    },

    componentDidMount() {
     
    },

    componentWillMount() {
        console.log(this.state.pageNumber);
        this.getAnswers();

       
   
    },

    getAnswers() {
        var _this = this;
        var hardCodedDataQuery,
            dynamicDataQuery;

        var objectIdsArray = ["VGF1UCoZU5", "oWlblkHGpC", "6TTHPSneQU", 
                       "cJBGsiHH1Y", "DNigZ6egMc", "r0IbnW3wp0", "asqvsXw4be", "ozSM3igXSx", "2QfVi8YVhM",
                  "7RhOrbGGni", "ausAe1ZaIK", "WS2RGxVAKk", "aBeKdLM3E1", "VaP4llxFOs", "kGTNTx95ds"];


      


        hardCodedDataQuery = new Parse.Query(ParseQuestions),
        hardCodedDataQuery.containedIn("objectId", objectIdsArray);
        hardCodedDataQuery.ascending('positionConsumer');
        hardCodedDataQuery.include('answers');

        dynamicDataQuery = new Parse.Query(ParseQuestions);
        dynamicDataQuery.notContainedIn("objectId", objectIdsArray);
        dynamicDataQuery.notEqualTo('type', 'pro');
        dynamicDataQuery.ascending('positionConsumer');
        dynamicDataQuery.include('answers.profiles');
        
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
                    hardCodedQuestion.text="I live in ";
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
                    hardCodedQuestion.text="I wash my hair ";
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
                    hardCodedQuestion.text="I wish ";
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
        var _this = this;
        console.log('getSentences');
        console.log('data', this.state.dataSource);
        var obj = [];
        var elem;
        var answers;
        var data = this.state.dataSource[this.state.pageNumber];
        data.forEach(function(item, index) { 
            console.log(this);

            elem = <span key={index} className="question-text">
                    <span > {item.text}</span>
                
                        <ReactSelect className="selectAnswer">
                            {item.get('answers').map(function(option, indexAnswer) {
                            return <option className="selectOption" key={indexAnswer} value={indexAnswer}  data-indexQuestion={index} data-indexAnswer={indexAnswer}>{option.get('title')}</option>   
                            })}                                         
                        </ReactSelect> 
              
                    </span>
            obj.push(elem) 
        });

        return obj;
    },

    getQCM () {
        var el1;
        var obj = [];
        var data = this.state.dataSource[this.state.pageNumber];
 
        for (var i = 0; i < data.get('answers').length; i++) {
            el1 = <div key={i} className="question-text checkOption-wrapper col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="checkOption" >
                        <input type="checkbox" value={i} className="checkbox" data-indexAnswer={i} id={data.get('answers')[i].get('title')} />
                        <label className="checkboxLabel"  htmlFor={data.get('answers')[i].get('title')}>
                           {data.get('answers')[i].get('title')}
                        </label>
                    </div> 
                </div>
            obj.push(el1);                
        }; 


        return obj
    },

    nextPage(){
        console.log('nextPage');
        var pageObject = this.state.dataSource[this.state.pageNumber];
        if (this.isQCM() === false) {
            this.getSelectedAnswers();
        } else {
            this.getCheckedAnswers();
        }
         var newPageNumber = this.state.pageNumber + 1;
         var totalPage = this.state.dataSource.length;

        //if (newPageNumber === totalPage) {
        if (newPageNumber === 6) {
            this.goToLogin();
         }
        else{
        this.setState({  
            pageNumber:this.state.pageNumber + 1
        });
    }

    },

    goToLogin() {
        this.context.router.push({
            pathname: '/signUp',
            state: { 
                    questions: this.state.questions,
                    answers: this.state.answers,
                    questionTitles: this.state.questionTitles,
                    answerTitles:  this.state.answerTitles
                }
            });


    },

    getCheckedAnswers(){
       
        var checkedAnswer = $( "input:checked" )[0];
        console.log(checkedAnswer);

            var answerIndex = checkedAnswer.getAttribute('data-indexAnswer');
          
            console.log('our value', checkedAnswer);
            console.log('our indexes',answerIndex);


            console.log('PAGE NUMBER',this.state.pageNumber)
           var questionObject = this.state.dataSource[this.state.pageNumber];
           var answerObject = this.state.dataSource[this.state.pageNumber].get('answers')[answerIndex];

            
            this.state.questions.push(questionObject)
            this.state.answers.push(answerObject)
            this.state.questionTitles.push(questionObject.get('title'));
            this.state.answerTitles.push(answerObject.get('title'));

            console.log(this.state, "QMC");

      

        console.log('CHECKED!!!QMC');
    },

    getSelectedAnswers(){
        var _this = this;
        var array =[];
        $('li.selected').each(function(i, el) {
            array.push(el);

            var answerIndex = el.getAttribute('data-original-index');
          
            console.log('our value', el.innerText);
            console.log('our indexes',answerIndex);

           var questionObject = _this.state.dataSource[_this.state.pageNumber][i];
           var answerObject = _this.state.dataSource[_this.state.pageNumber][i].get('answers')[answerIndex];
             
            _this.state.questions.push(questionObject)
            _this.state.answers.push(answerObject)
            _this.state.questionTitles.push(questionObject.get('title'));
            _this.state.answerTitles.push(answerObject.get('title'));

            console.log(_this.state, "STATE");
        });

        console.log(array, "our array");
     
    },



    getQCMOrSentences(){
        console.log('getQCMOrSentences')
        var item = this.state.dataSource[this.state.pageNumber];
        console.log('item', item);

        if (this.isQCM() === false) {
            return this.getSentences();
        } else {
           return this.getQCM();
        }
    },



    dynanamicPagination(){
        var pagination = [];
        for (var k=0; k < 10; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    getQCMtext(){
       var text = this.state.dataSource[this.state.pageNumber].get('title');
       return text;
    },

   isQCM(){
        var item = this.state.dataSource[this.state.pageNumber];
        console.log('item', item);

        if ($.isArray(item)) {
            return false;
        } else {
           return true;
        }
  
    },

    render: function() {
  
        console.log('render')
        var text = 'tell us about yourself';

        if (this.state.dataSource.length === 0) {
            return null
        } else {
            return (
                <div className="wrapperPhrase">
                    <Header />
                    <TitleComponent pageNumber={this.state.pageNumber} text={this.isQCM() ? this.getQCMtext() : text}/>
                    <div  className="question-wrapper">
                        <div className="question-text_wrapper" >
                            {this.getQCMOrSentences()}     
                        </div>
                    </div>
                    <div className="wrapperNext">
                        <div className="linkText" onClick={this.nextPage}>Next</div>
                        <div className="linkArrow"  onClick={this.nextPage}>
                        </div>
                    </div>
                    <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                    </div>
                </div>
            );
        }
    }
});

module.exports = NewQuestion;

