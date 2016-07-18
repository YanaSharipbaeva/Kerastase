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
import Header from './Header';

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

        console.log("componentWillMount");
        this.state.profile = this.props.location.state.profile;
        this.state.products = this.props.location.state.products;





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
                    profile: this.state.profile,
                    products:this.state.products
                }
        });
    },

    getProducts(){

        console.log("get products",this.state.products);

        var imageUrl =  [];
        for (var y = 0; y <  this.state.products.length; y++) {

            var product=this.state.products[y];
            console.log("Product", product);


            var image = product.get("image");
            console.log("image ",image);
            if(image) {

                imageUrl.push(<img data-image={y} onClick={this.openModal} key={y}
                                   src={image.url()}></img>);
            }
        }


        return imageUrl;
    },

    showProductInfo(e){


            console.log("showProductInfo",this.state.product);
            if(!this.state.product){

                return null;

            }

           var modal = [<div><div className=" customersText-icon" aria-hidden="true" onClick={this.closeModal}>&#10006;</div>
                        <div className="product-wrapper">
                            <div className="product_title">{this.state.product.get("title")}</div>
                            <div className="product_text">{this.state.product.get("description")}</div>
                            <a className="product_link">Find your product in salon ></a>
                            <a className="product_link">Shop now online ></a>
                        </div>
                        <div className="image-wrapper">
                        <img  src={this.state.product.get("image").url()} className="product_image"></img></div></div>]
            return modal;
    },



    openModal (e) {
       var imageIndex = e.target.getAttribute('data-image')    
        console.log(this.state.products);      
        this.setState({
            showModal: true,
            product:this.state.products[imageIndex],
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
                <Header />
                <div className="info-block_title">AT-Home PROGRAM</div>
                <div className="at-home-wrapper">
                    <div className="info-block image-block  ">
                        <div className="info-block_wrapper">
                            <div className="info-image1"></div>
                            <div className="info-image2"></div>
                            <a href="" className="salon_link"> > Shop Now</a>
                        </div>
                    </div>
   
                    <div className="info-block text_block">
                        <div className="text_wrapper  ">
                            <p className="result-title info-text_title">{this.state.profile.get("prescriptionAtHome")}</p>
                            <p className="info-text">{this.state.profile.get("descriptionAtHome")}</p>
                        </div>

                    </div>
                    <div className="products">
                        {this.getProducts()}   
                    </div>
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


