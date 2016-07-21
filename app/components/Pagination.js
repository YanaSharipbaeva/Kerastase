'use strict';

import Parse from 'parse';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';


var Pagination = React.createClass({

    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    refresh(){
        this.context.refresh()
    },


    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 11; k++) {
            if (k === 0) {
                return null
            } else {
                pagination.push(<span key={k}><div className="round" className={this.props.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>);
            }
        }
        return pagination

    },

    render: function() {
        return (


                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>


        );
    }
});

module.exports = Pagination;