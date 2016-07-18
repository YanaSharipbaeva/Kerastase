'use strict';

import Parse from 'parse';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';


var Header = React.createClass({

    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <header className="header container">
                <div className="row header-wrapper">
                    <div className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4"> 
                        <Link to="/start" className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4 fa fa-bars header-icon" aria-hidden="true"></Link> 
                    </div>
                    <div className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4 logo-wrapper"> 
                        <a className="header-logo" target="_blank" href="http://www.kerastase.co.uk/"></a>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4 "> 
                        <div className="user_icon pull-right"></div>
                    </div>  
                </div>
            </header>
        );
    }
});

module.exports = Header;