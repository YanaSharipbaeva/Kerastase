'use strict'

import React from 'react';
import { Link } from 'react-router';
import '../styles/Main.css';

var NextLink = React.createClass({
    render: function() {
        return (
            <div className="wrapperNext">
                <div className="linkText" onClick={this.props.next}>Next</div>
                <Link className="linkArrow" to={this.props.link}>
                </Link>
            </div>
        );
    }
});

module.exports = NextLink;





