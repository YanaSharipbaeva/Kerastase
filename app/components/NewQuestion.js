'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

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
    
var NewQuestion = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 0,
            dataSource:[],
            questions:[],
            answers:[],
            questionTitles:[],
            answerTitles:[],
            profilesArray:[],
            inputRefs:[],
            showModal:false,
            maxWidthTitle:0,
            selectState:0,
            checkboxState:"false"
        };
    },

    componentWillMount() {
        this.getAnswers();
    },

    componentDidMount() {

        var select = [];
        $('#app').find('.bootstrap-select').forEach(function(el){
            select.push(el);
        });
        console.log("SELECTS", select);  

        select.toggleClass('open', this.state.open);  

        var  _this =this;
        $('html').click(function () {
            //console.log("inputRefs",_this.state);
            _this.clearSelect();
        });
    },



    clearSelect() {

        return;

     console.log("inputRefs",this.state.inputRefs);

        this.state.inputRefs.forEach(function (ref, index) {

            var select = $(ReactDOM.findDOMNode(ref)).find('div.bootstrap-select');

            console.log("shoudl close",select);
            select.toggleClass('open', false);

        });


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
        // dynamicDataQuery.include('answers.profiles.products');
        
        hardCodedDataQuery.find().then(
            (hardCodedQuestions) => {
                dynamicDataQuery.find().then(
                    (dynamicQuestions) => {
                    console.log('dynamicQuestions');
                     var arr = _this.buildDataSource(hardCodedQuestions,dynamicQuestions);
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
        hardCodedQuestions.forEach(function (hardCodedQuestion, index) {
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

        dynamicQuestions.forEach(function(item){
            console.log($.isArray(item));
        });

        return dynamicQuestions;

    },

    addColorToSelectedOption () {
        consolo.log('OPTION');
    },

    getCharacters(index){
        var _this = this;
        var maxWidthTitle = 0;
        var maxTitle = "";


        var data = this.state.dataSource[this.state.pageNumber];
        data[index].get('answers').forEach(function(option){
            if (option.get('title').length > maxWidthTitle) {
                maxWidthTitle = option.get('title').length;  
            }

        });

        console.log("max width :",maxWidthTitle);

        for (var m = 0; m < maxWidthTitle; m++) {
            maxTitle = maxTitle + "&nbsp;";
        }

        console.log("max title :",maxWidthTitle);
        return maxTitle;
    
    },

    getSentences() {
       $('#app').removeClass('QCM-long');
        var _this = this;
        var obj = [];
        var elem;
        var answers;
        var data = this.state.dataSource[this.state.pageNumber];
        data.forEach(function(item, index) { 

            elem = <span key={index} className="question-text">
                    <span > {item.text}</span>         
                    <ReactSelect ref={(c) => _this.state.inputRefs.push(c)} className="selectpicker selectAnswer"
                        hideDisabled="true"
                        title={_this.getCharacters(index)}
                        >
                        <option selected="selected" key={_this.state.selectState} disabled="disabled" className="selectOption"  data-hidden="true"></option>
                        {item.get('answers').map(function(option, indexAnswer) {
                        
                            return <option  key={_this.state.selectOption} className="optionName" key={indexAnswer}  data-indexQuestion={index} data-indexAnswer={indexAnswer}>{option.get('title')}</option> 

                        })}                                         
                    </ReactSelect> 
              
                    </span>
            obj.push(elem) 
        });

        return obj;
    },

    getQCM () {
        var pageNumber = this.state.pageNumber;
        if (pageNumber === 10 || pageNumber === 7 || pageNumber === 9) {
            $('#app').addClass('QCM-long');
        }

        $(".radio").attr('checked', false);
        var element;
        var obj = [];
        var data = this.state.dataSource[this.state.pageNumber];
 
        for (var i = 0; i < data.get('answers').length; i++) {
            element = <div key={i} className="question-text checkOption-wrapper col-sm-12 col-md-12 col-lg-6 col-xl-6">
                    <div className="checkOption" >
                        <input type="radio"  key={this.state.checkboxState}className="radio" name= "radio" data-indexAnswer={i} id={data.get('answers')[i].get('title')} />
                        <label className="checkboxLabel"  htmlFor={data.get('answers')[i].get('title')}>
                           <div className="checkOptionBlock">{data.get('answers')[i].get('title')}</div>
                        </label>
                    </div> 
                </div>
            obj.push(element);                
        }; 

        return obj
    },

    // isAllSelected(){
    //     var _this = this;
    //     var isSelected = false;
    //     var selectedOptions = [];
    //     $('.selected').each(function (option) {
    //         console.log($(this).hasClass('hidden'));
    //         ($(this).hasClass('hidden') || $('.radio:checked ')) ? _this.openModal() : _this.nextPage()
    //     });
    //     this.nextPage()
    // },

    nextPage() {
        var pageObject = this.state.dataSource[this.state.pageNumber];

        if (this.isQCM() === false) {
            this.getSelectedAnswers();
        } else {
            this.getCheckedAnswers();
        }

        $('.selected').each(function(i, el) {
           $(this).removeClass('selected');
        });

        // $('.radio').removeAttr('checked');

        this.setState({  
            selectState: this.state.selectState + 1,
            checkboxState:"true"
        });


        var newPageNumber = this.state.pageNumber + 1;
        var totalPage = this.state.dataSource.length;
     
        //if (newPageNumber === totalPage) {
        if (newPageNumber === 2) {
            this.goToLogin();
        } else {
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
        // if (checkedAnswer === undefined){
        //     this.openModal();
        // } else {
            var answerIndex = checkedAnswer.getAttribute('data-indexAnswer');

            var questionObject = this.state.dataSource[this.state.pageNumber];
            var answerObject = this.state.dataSource[this.state.pageNumber].get('answers')[answerIndex];

            this.state.questions.push(questionObject)
            this.state.answers.push(answerObject)
            this.state.questionTitles.push(questionObject.get('title'));
            this.state.answerTitles.push(answerObject.get('title'));
        // }
    },

    getSelectedAnswers(){
        var _this = this;
        var array = [];
        $('li.selected').each(function(i, el) {
            array.push(el);

            var answerIndex = el.getAttribute('data-original-index') - 1;
            var questionObject = _this.state.dataSource[_this.state.pageNumber][i];
            var answerObject = _this.state.dataSource[_this.state.pageNumber][i].get('answers')[answerIndex];
             
            _this.state.questions.push(questionObject)
            _this.state.answers.push(answerObject)
            _this.state.questionTitles.push(questionObject.get('title'));
            _this.state.answerTitles.push(answerObject.get('title'));

        }); 
    },

    getQCMOrSentences(){
        var item = this.state.dataSource[this.state.pageNumber];
        if (this.isQCM() === false) {
            return this.getSentences();
        } else {
           return this.getQCM();
        }
    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 10; k++) {
            if (k === 0) {
                return null
            } else {
                pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
            }
        }
        return pagination

    },

    getQCMtext() {
       var text = this.state.dataSource[this.state.pageNumber].get('title');
       return text;
    },

   isQCM() {
        var item = this.state.dataSource[this.state.pageNumber];
        if ($.isArray(item)) {
            return false;
        } else {
           return true;
        }
  
    },

    openModal () {
        this.setState({
            showModal: true
        });
    },

    closeModal () {
        this.setState({
            showModal: false
        });
    },

    render: function() {
        var text = 'tell us about yourself';

        if (this.state.dataSource.length === 0) {
            return null
        } else {
            return (
                <div className="wrapperPhrase">
                    <Header />
                        <TitleComponent pageNumber={this.state.pageNumber} text={this.isQCM() ? this.getQCMtext() : text}/>
                    <div  className="question-wrapper">
                        <div  className="question-text_wrapper row" >
                            {this.getQCMOrSentences()}     
                        </div>
                    </div>

                    <div className="wrapperNext">
                        <div className="linkText">Next</div>
                        <div className="linkArrow"  onClick={this.nextPage}>
                        </div>
                    </div>

                    <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                    </div>
                    <Modal show={this.state.showModal} onHide={this.closeModal} className="modalQuestion">

                    <Modal.Body>
                        <div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <p className="customersText">You have not answered some questions. Please, answer all questions and try again</p>
                    </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
});

module.exports = NewQuestion;

