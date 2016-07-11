'use strict';

import React from 'react';
require('../styles/Question.css');
require('../styles/Main.css');

var TitleComponent = React.createClass({

    render: function() {
        console.log(this.props.pageNumber);
        return (
            <div className="wrapperTitle">
                {this.props.pageNumber?
                    <div className="questionNumber">{this.props.pageNumber} / 10</div>
                : null }
                    <p className="questionTitle">k-profile</p>
                    <p className="questionTitle">{this.props.text}</p>
            </div>
        );
    }
});

module.exports = TitleComponent;