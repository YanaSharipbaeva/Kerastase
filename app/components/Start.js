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

    render: function() {
        return (
            <div className="wrapper">
                <Header />
                
            </div>
        );
    }
});

module.exports = Start;