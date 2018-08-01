import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import './index.scss';

import LoginService from 'service/login-service.jsx';
import AppUtil from 'util/app-util.jsx';

const loginService = new LoginService();
const appUtil = new AppUtil();

class Index extends React.Component{

    render(){
        return (
            <div>
                {/*----- carousel -----*/}
                <div className="container">
                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src={require('resource/image/index/carousel/carousel1.jpg')}/>
                                <div className="carousel-caption">

                                </div>
                            </div>
                            <div className="item">
                                <img src={require('resource/image/index/carousel/carousel2.png')}/>
                                <div className="carousel-caption">
                                </div>
                            </div>
                            <div className="item">
                                <img src={require('resource/image/index/carousel/carousel3.jpg')}/>
                                <div className="carousel-caption">
                                </div>
                            </div>
                        </div>

                        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                {/*----- hot products -----*/}
                <div className="col-md-12 margin-top-md">
                    <div className="panel panel-default">
                        <div className="panel-body bg-green">
                            热门产品
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <img src={require('resource/image/index/长白菜.png')}/>
                                <div className="caption">
                                    <h3 className="text-center">长白菜</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="thumbnail">
                                <img src={require('resource/image/index/土豆.jpg')}/>
                                <div className="caption">
                                    <h3 className="text-center">土豆</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <img src={require('resource/image/index/西红柿.jpg')} />
                                <div className="caption">
                                    <h3 className="text-center">西红柿</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="thumbnail">
                                <img src={require('resource/image/index/瘦肉.jpg')} />
                                <div className="caption">
                                    <h3 className="text-center">瘦肉</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;