'use strict';
import React from 'react';
require('../styles/Counter.css');

var CounterRound = React.createClass({
    render: function() {
        return (
            <div className="round"></div>      
        );
    }
});

module.exports = CounterRound;