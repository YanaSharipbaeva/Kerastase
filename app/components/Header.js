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

    refresh(){
        this.context.refresh()
    },

    render: function() {
        return (
            <header className="header container col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row header-wrapper">
                    <div className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4"> 
                        <Link to="/start" onClick={this.refresh} className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4  header-icon" aria-hidden="true"></Link> 
                    </div>
                    <div className="col-xl-4 col-lg-4 col-xs-4 col-sm-4 col-md-4 logo-wrapper"> 
                        <a className="header-logo" target="_blank" href="http://www.kerastase.co.uk/"></a>
                    </div>

                </div>
            </header>
        );
    }
});

module.exports = Header;