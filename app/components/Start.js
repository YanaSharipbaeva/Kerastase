'use strict';
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import Header from './Header';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
require('../styles/Start.css');

var Start = React.createClass({

    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    componentWillMount() {
        $('#app').removeClass('QCM-long');
    },

    nextPage(){
        this.context.router.push({
            pathname: '/questions'
        });
    },

    render: function() {
        return (
            <div className="wrapper row">
                <Header />
                <div className="start-wrapper col-xs-12">
                    <div className="wrapper-info ">
                        <h1  className="start-title">k-profile</h1>;
                        <div  onClick={this.nextPage} className="buttonStyles col-xs-10 col-md-6 col-xl-5 col-lg-5" >start your hair diagnosis</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Start;