'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Modal } from 'react-bootstrap';

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
import '../styles/Dropdown.css';
import Footer from "./Footer"
import Dropdown from 'react-dropdown';
import Pagination from "./Pagination"
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
            showModal:false,
            maxWidthTitle:0
        };
    },

    componentWillMount() {
        this.getAnswers();
    },

    componentDidMount() {

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
                    hardCodedQuestion.shouldReturn = true;
                    tempArray[0].push(hardCodedQuestion);
                    break
                case 3:
                    hardCodedQuestion.text="and I visit a salon every ";
                    tempArray[0].push(hardCodedQuestion);
                    break
                case 4:
                    hardCodedQuestion.text="the world, your hair lives in ";
                    hardCodedQuestion.shouldReturn = true;
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
                    hardCodedQuestion.shouldReturn = true;
                    tempArray[1].push(hardCodedQuestion);
                    break
                case 9:
                    hardCodedQuestion.text="and it's shape is";
                    tempArray[1].push(hardCodedQuestion);
                    break
                case 10:
                    hardCodedQuestion.text="I wash my hair ";
                    hardCodedQuestion.shouldReturn = true;
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
                    hardCodedQuestion.shouldReturn = true;
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

        console.log("getCharacters","index is ",index);
        var maxWidthTitle =  this.getMaxWidth(index);
        console.log("getMaxWidth",maxWidthTitle);

        var maxTitle = "";

        for (var m = 0; m < maxWidthTitle-1; m++) {
            maxTitle = maxTitle + "_";
        };

        return maxTitle;


    },

    addSpaceToAnswers(title,maxWidth){

   console.log("addSpaceToAnswers",title,":",maxWidth);

        return title;
        var diff = maxWidth-title.length;
        var middle= diff/2;

        console.log("shoudl add char on each side ",middle)

        var newTitle=title;

        for (var m = 0; m < middle+1; m++) {
            newTitle = "&#32;"+newTitle +"&#32;";
        };

        console.log("addSpaceToAnswers wit diff",diff);


    return newTitle;
    },

    getMaxWidth(index){

        var maxWidthTitle = 0;

        var data = this.state.dataSource[this.state.pageNumber];

        console.log("data is ",data,"index is ",index);

        data[index].get('answers').forEach(function(option){
            if (option.get('title').length > maxWidthTitle) {
                maxWidthTitle = option.get('title').length;
            }
        });

        return maxWidthTitle;

    },


    onSelect(e) {
        var el = e.target;
        console.log('element', e);
        // $(el).addClass('chosenOption');
    },

    getSentences() {
        console.log("getCharacters", this.getCharacters(0));
        var _this = this;
        var obj = [];
        var elem;
        var answers;
        var data = this.state.dataSource[this.state.pageNumber];

        var options=[];


        data.forEach(function(question, topIndex) {
            options[topIndex]=[];

            var __this=_this;
            var maxWitdth = _this.getMaxWidth(topIndex);
            console.log("this maxwidth",maxWitdth);


            question.get('answers').forEach(function(answer, index) {

                var title = answer.get("title");
                var newTitle = __this.addSpaceToAnswers(title,maxWitdth);

                var label = topIndex+"-"+index;
                var dic = {value:label,label:newTitle};
                options[topIndex].push(dic)

            });

        });

        data.forEach(function(item, index) {
           

            var __this=_this;

            var style = {color:"red",width:"500px",backgroundColor:"red"}

            elem = <span key={index} className={(item.shouldReturn === true) ?"row question-text": "question-text"} >
                    <span className="question-text_info"> {item.text}</span>
                    <Dropdown  options={options[index]} onChange={__this.onSelect}  value={__this.getCharacters(index)}  />

                    </span>
            obj.push(elem)
        });

        return obj;
    },

    getQCM () {
        $(".radio").attr('checked', false);
        var element;
        var obj = [];
        var data = this.state.dataSource[this.state.pageNumber];

        for (var i = 0; i < data.get('answers').length; i++) {
            element = <div key={i} className="question-text checkOption-wrapper col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="checkOption" >
                    <input type="radio"  className="radio" name= "radio" data-indexAnswer={i} id={data.get('answers')[i].get('title')} />
                    <label className="checkboxLabel"  htmlFor={data.get('answers')[i].get('title')}>
                        <div className="checkOptionBlock">{data.get('answers')[i].get('title')}</div>
                    </label>
                </div>
            </div>
            obj.push(element);
        };

        return obj
    },

    startTest(){
        this.setState({
            pageNumber:this.state.pageNumber + 1
        });
    },

    isAllSelected(){
        var _this = this;
        var isSelected = false;
        var selectedOptions = [];
        $('.selected').each(function (option) {
            $(this).hasClass('hidden') ? _this.openModal() : _this.nextPage()
        });
        return isSelected
    },

    nextPage() {

        var pageObject = this.state.dataSource[this.state.pageNumber];

        if (this.isQCM() === false) {
            this.getSelectedAnswers();
        } else {
            this.getCheckedAnswers();
        }

        var newPageNumber = this.state.pageNumber + 1;
        var totalPage = this.state.dataSource.length;

        //if (newPageNumber === totalPage) {
        if (newPageNumber === 10) {
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

        var answerIndex = checkedAnswer.getAttribute('data-indexAnswer');

        var questionObject = this.state.dataSource[this.state.pageNumber];
        var answerObject = this.state.dataSource[this.state.pageNumber].get('answers')[answerIndex];

        this.state.questions.push(questionObject)
        this.state.answers.push(answerObject)
        this.state.questionTitles.push(questionObject.get('title'));
        this.state.answerTitles.push(answerObject.get('title'));
    },

    getSelectedAnswers(){

        var _this = this;
        var array = [];
        $('li.selected').each(function(i, el) {
            array.push(el);

            var answerIndex = el.getAttribute('data-original-index');
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
        if(this.isQCM() === false) {
            return this.getSentences();
        } else {
            return this.getQCM();
        }
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


                <div className="wrapperPhrase container">
                <div className="row">
                    <Header />
                        <TitleComponent pageNumber={this.state.pageNumber} text={this.isQCM() ? this.getQCMtext() : text}/>
                </div>
                 <div className="row">
                    <div  className="question-wrapper col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div  className="question-text_wrapper row" >
                            {this.getQCMOrSentences()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Footer onClick={this.nextPage} title="Next"/>
                </div>

                   <Pagination pageNumber={this.state.pageNumber}/>


                    <Modal show={this.state.showModal}>

                        <Modal.Body>
                            <p className="customersText">Please, choose one answer</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <button className="btn customersText" onClick={this.closeModal}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }
});

module.exports = NewQuestion;

