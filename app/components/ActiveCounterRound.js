'use strict';
import React from 'react';
require('../styles/Counter.css');

var ActiveCounterRound = React.createClass({
    render: function() {
        return (
            <div className="activeRound"></div>      
        );
    }
});

module.exports = ActiveCounterRound;