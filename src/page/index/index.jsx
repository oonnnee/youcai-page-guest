import React from 'react';
import {Link} from 'react-router-dom';

import './index.scss';
import './index.js';

import LoginService from 'service/login-service.jsx';
import AppUtil from 'util/app-util.jsx';

const loginService = new LoginService();
const appUtil = new AppUtil();

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            pwd: ''
        }
    }


    login(){
        const loginInfo = {
            id: this.state.id,
            pwd: this.state.pwd
        };
        const result = loginService.checkLoginInfo(loginInfo);
        if (!result.status){
            appUtil.errorTip(result.msg);
            return;
        }
        loginService.login(this.state).then(data => {
            appUtil.setStorage('user', data);
            window.location.href = '/home';
        }, err => {
            appUtil.errorTip(err);
        })
    }

    onTextChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render(){
        const user = appUtil.getStorage("user");
        let NavbarRight;
        if (user){
            NavbarRight = <li><Link to="/home">欢迎，{user.name}</Link></li>;
        }else{
            NavbarRight = <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal">登录</a></li>;
        }
        return (
            <div>
                {/*----- header -----*/}
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">
                                <img src={require('resource/image/brand.png')} />
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><a href="/">欢迎访问优菜网</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {NavbarRight}
                            </ul>
                        </div>
                    </div>
                </div>

                {/*----- carousel -----*/}
                <div className="container">
                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className="item active">
                                <img src={require('resource/image/carousel1.png')} width="100%"/>
                                <div className="carousel-caption">
                                    干香菇1
                                </div>
                            </div>
                            <div className="item">
                                <img src={require('resource/image/carousel2.png')} width="100%"/>
                                <div className="carousel-caption">
                                    干香菇2
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
                        <div className="panel-body bg-primary">
                            热门产品
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/*----- latest products -----*/}
                <div className="col-md-12 margin-top-md">
                    <div className="panel panel-default">
                        <div className="panel-body bg-primary">
                            最新产品
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/*----- footer -----*/}
                <div className="text-center">优菜网 All rights reserved</div>

                {/*----- login modal -----*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="exampleModalLabel">用户登录</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="id" placeholder="用户名"
                                               onChange={e => this.onTextChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="pwd" placeholder="密码"
                                               onChange={e => this.onTextChange(e)}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.login()}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;