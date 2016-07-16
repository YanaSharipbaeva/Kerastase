'use strict';

import React from 'react';
require('../styles/Question.css');
require('../styles/Main.css');

var TitleComponent = React.createClass({

    render: function() {
        return (
            <div className="wrapperTitle">
                    <div className="questionNumber">{this.props.pageNumber + 1} / 10</div>
                    <p className="questionTitle">k-profile</p>
                    <p className="questionTitle">{this.props.text}</p>
            </div>
        );
    }
});

module.exports = TitleComponent;