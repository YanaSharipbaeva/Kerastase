'use strict';

import Parse from 'parse';
Parse.initialize("KerastaseBO");
Parse.serverURL = 'http://kerastase-server.development-desk.fr/parse';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';
import { Modal } from 'react-bootstrap';

require('../styles/Main.css');
require('../styles/Result.css');

var AtHome = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber: 2,
            result: [],
            title:'',
            description:''
        };
    },

    componentWillMount() {
        $('#app').addClass('QCM-long');
  
        console.log('PROPS',  this.props.location.state);
        this.state.profiles = this.props.location.state.profiles;
        this.state.products = this.props.location.state.profiles[0].products;
        console.log("PRODUCTS" , this.state.products);
    },

    dynanamicPagination(){
        var pagination = [];
        for (var k = 0; k < 5; k++) {
            pagination.push(<span key={k}><div className="round" className={this.state.pageNumber === k? "activeRound" : "round"}></div><HorizontalLine  /></span>); 
        }
        return pagination

    },

    nextPage(){
        console.log('nextPage');
        this.context.router.push({
            pathname: '/store-locator',
            state: { 
                    profiles: this.state.profiles
                }
        });
    },

    getProducts(){
        var imageUrl =  [];
        for (var y = 0; y <  this.state.products.length; y++) {

            var product=this.state.products[0];
            // console.log("Product", product);
            imageUrl.push(<img  data-image={y} onClick={this.openModal} key={y} src={product.image.url}></img>);
        }

        return imageUrl;
    },

    showProductInfo(e){
           var modal = [<div><div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <div className="product-wrapper">
                            <div className="product_title">{this.state.title}</div>
                            <div className="product_text">{this.state.description}</div>
                            <a className="product_link">Find your product in salon ></a>
                            <a className="product_link">Shop now online ></a>
                        </div>
                        <div className="image-wrapper">
                        <img  src={this.state.image} className="product_image"></img></div></div>]
            return modal;
    },



    openModal (e) {
       var imageIndex = e.target.getAttribute('data-image')    
        console.log(this.state.products);      
        this.setState({
            showModal: true,
            image:e.target.src,
            title:this.state.products[imageIndex].title,
            description:this.state.products[imageIndex].description
        });
          this.showProductInfo(e);

    },

    closeModal () {
        this.setState({
            showModal: false
        });
    },

    render: function() {  
        return (
            <div className="wrapper-in-salon_ritual result3">
                <div className="info-block_title">AT-Home PROGRAM</div>
                    <div className="info-block image-block  ">
                        <div className="info-block_wrapper">
                            <div className="info-image1"></div>
                            <div className="info-image2"></div>
                            <a href="" className="salon_link"> > Shop Now</a>
                        </div>
                    </div>
   
                    <div className="info-block text_block">
                        <div className="text_wrapper  ">
                            <p className="result-title info-text_title">{this.state.products[0].title}</p>
                            <p className="info-text">{this.state.products[0].description}</p>
                        </div>
                        <div className="text_wrapper ">
                            <ul className="info-text">
                                <li>recommended routine</li>
                                <li>1. Bathe : {this.state.products[0].title}</li>
                                <li>2. Treat : {this.state.products[1].title} </li>
                                <li>3. Texturize : {this.state.products[2].title}</li>
                       
                            </ul>
                        </div>
                    </div>
                    <div className="products">
                        {this.getProducts()}   
                    </div>
                <div>
                    <div className="wrapperNext">
                        <div className="linkText">Receive by</div>
                        <div className="linkArrow"  onClick={this.nextPage}></div>
                    </div>
                    <div className="social-links">
                        <div className="social-links_title">share this ritual</div>
                        <div className="s_link">
                            <a href="https://twitter.com" className="fa fa-twitter" aria-hidden="true"></a>
                        </div>
                        <div className="s_link">
                            <a href="https://facebook.com" className="fa fa-facebook" aria-hidden="true"></a>
                        </div>
                    </div> 
                    <Link to="/start" className="restart_profile">Restart K profile</Link> 
                </div>
                <div className="wrapper-counter">
                    {this.dynanamicPagination()}
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>

                    <Modal.Body>
                        {this.showProductInfo()}
                    </Modal.Body>
                    </Modal>
            </div>
        );
    }
});

module.exports = AtHome;


