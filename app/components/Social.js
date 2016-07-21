'use strict';

import Parse from 'parse';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';


var Social = React.createClass({
    refresh(){
        this.context.refresh()
    },

    render: function() {
        return (
            <div className="Wrapper-links col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="social-links col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="social-links_title">share this ritual</div>
                    <div className="s_link">
                        <a href="https://twitter.com" className="fa fa-twitter" aria-hidden="true"></a>
                    </div>
                    <div className="s_link">
                        <a href="https://facebook.com" className="fa fa-facebook" aria-hidden="true"></a>
                    </div>
                </div> 
                <Link to="/start" className="restart_profile col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">Restart K profile</Link>
            </div>
        );
    }
});

module.exports = Social;