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

    render: function() {
        return (
            <div className="wrapper">
                <Header />
                <div className="start-wrapper">
                    <h1 className="start-title">k-profile</h1>
                    <Link  className="buttonStyles" to="/question/1">start your hair diagnosis</Link>
                </div>
            </div>
        );
    }
});

module.exports = Start;