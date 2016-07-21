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
import Pagination from './Pagination';
import Footer from "./Footer";
import Social from "./Social"
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
        var profile = this.props.location.state.profile;


        if(profile instanceof Parse.Object==false){

            profile.className = "Profile";
            profile =  Parse.Object.fromJSON(profile);


        }

        this.state.profile = profile;
        var _this = this;
        Parse.Object.fetchAllIfNeeded(profile.get("products"), {
            success: function(list) {
                console.log("success",list);

                _this.setState({
                    products: list
                })


            },
            error: function(error) {
                console.log("error",error);
            },
        });

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

        if(this.state.products){

        console.log("get products",this.state.products);

        var imageUrl =  [];
        for (var y = 0; y <  this.state.products.length; y++) {

            var product=this.state.products[y];
            console.log("Product", product);


            var image = product.get("image");
            console.log("image ",image);
            if (image) {

                imageUrl.push(<div className="product-wrapper-image col-sm-4 col-md-4 col-lg-4 " key={y}><img className="image" data-image={y} onClick={this.openModal} key={y}
                    src={image.url()}></img></div>);
            }
        }


        return imageUrl;

        }
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
                            <a  href="http://salons.kerastase.co.uk/" target="_blank" className="product_link">Find your product in salon ></a>
                            <a  href={this.state.product.get("url")} target="_blank" className="product_link">Shop now online ></a>
                        </div>
                        <div className="image-wrapper">
                        <img  src={this.state.product.get("image").url()} className="product_image"></img></div></div>]
            return modal;
    },



    openModal (e) {
        // console.log(this.state.products[imageIndex]);
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
            <div className="wrapper-in-salon_ritual result3 container">
                <Header />
                <div className="info-block_title">AT-Home PROGRAM</div>
                <div className="at-home-wrapper row">
                    <div className="info-block image-block col-sm-10 col-md-2 col-lg-2 col-xl-2 ">
                        <div className="info-block_wrapper">
                            <div className="info-image1"></div>
                            <div className="info-image2"></div>
                            <a href="http://salons.kerastase.co.uk/" target="_blank" className="salon_link"> > Shop Now</a>
                        </div>
                    </div>
   
                    <div className="info-block text_block col-md-12 col-lg-5 col-xl-5">
                        <div className="text_wrapper  ">
                            <p className="result-title info-text_title">{this.state.profile.get("prescriptionAtHome")}</p>
                            <p className="info-text">{this.state.profile.get("descriptionAtHome")}</p>
                        </div>

                    </div>
                    <div className="products col-lg-5 col-sm-12 col-md-12 col-xl-5">
                        <div className="wrapper-products-block row">
                            {this.getProducts()}   
                        </div>
                    </div>
                </div>
                <div>


                <Footer onClick={this.nextPage} title="Store Locator"/>
                <Social/>
   
                </div>
                <Pagination pageNumber={this.state.pageNumber}/>
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


