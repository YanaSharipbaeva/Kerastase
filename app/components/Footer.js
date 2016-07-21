'use strict';

import Parse from 'parse';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';


var Footer = React.createClass({

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
            <div id="footer">
                <div className="">
                    <div className="linkText">Next</div>
                     <div className="linkArrow"  onClick={this.nextPage}></div>
                </div>
            </div>


        );
    }
});

module.exports = Footer;