'use strict';
import React from 'react';
require('../styles/Counter.css');

var HorizontalLine = React.createClass({
    render: function() {
        return (
            <div className="horizontalLine"></div>      
        );
    }
});

module.exports = HorizontalLine;