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
            login_phone: '',
            login_pwd: '',
            register_pwd: '',
            register_repwd: '',
            register_name: '',
            register_addr: '',
            register_phone: '',
            register_leader1: '',
            register_mobile1: '',
            register_leader2: '',
            register_mobile2: '',
        }
    }


    login(){
        const loginInfo = {
            phone: this.state.login_phone,
            pwd: this.state.login_pwd,
        };
        const result = loginService.checkLoginInfo(loginInfo);
        if (!result.status){
            appUtil.errorTip(result.msg);
            return;
        }
        loginService.login(loginInfo).then(data => {
            appUtil.setStorage('user', data);
            window.location.href = '/home';
        }, err => {
            appUtil.errorTip(err);
        })
    }

    register(){
        const registerInfo = {
            pwd: this.state.register_pwd,
            repwd: this.state.register_repwd,
            name: this.state.register_name,
            addr: this.state.register_addr,
            phone: this.state.register_phone,
            leader1: this.state.register_leader1,
            mobile1: this.state.register_mobile1,
            leader2: this.state.register_leader2,
            mobile2: this.state.register_mobile2,
            note: ''
        };
        const result = loginService.checkRegisterInfo(registerInfo);
        if (!result.status){
            appUtil.errorTip(result.msg);
            return;
        }
        loginService.register(registerInfo).then(data => {
            appUtil.successTip('注册成功，快去登陆吧');
            $('#registerModal').modal('hide');
            this.setState({
                register_pwd: '',
                register_repwd: '',
                register_name: '',
                register_addr: '',
                register_phone: '',
                register_leader1: '',
                register_mobile1: '',
                register_leader2: '',
                register_mobile2: ''
            });
        }, err => {
            appUtil.errorTip(err);
        })
    }

    onChange(e){
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
            NavbarRight = (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="javascript:;" data-toggle="modal" data-target="#exampleModal">登录</a></li>
                    <li><a href="javascript:;" data-toggle="modal" data-target="#registerModal">注册</a></li>
                </ul>
            )
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
                            {NavbarRight}
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

                                </div>
                            </div>
                            <div className="item">
                                <img src={require('resource/image/carousel2.png')} width="100%"/>
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
                        <div className="panel-body bg-primary">
                            热门产品
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/hot/黄心白.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">黄心白</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/hot/京包菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">京包菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/hot/菜心.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">菜心</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/hot/瘦肉.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">瘦肉</h3>
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
                            <img src={require('resource/image/index/latest/青菜.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">青菜</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/latest/池鱼.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">池鱼</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/latest/秋刀鱼.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">秋刀鱼</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="thumbnail">
                            <img src={require('resource/image/index/latest/大头鱼.jpg')} />
                            <div className="caption">
                                <h3 className="text-center">大头鱼</h3>
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
                                <h4 className="modal-title" id="exampleModalLabel">客户登录</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="login_phone" placeholder="手机号"
                                               value={this.state.login_phone}
                                               onChange={e => this.onChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="login_pwd" placeholder="密码"
                                               value={this.state.login_pwd}
                                               onChange={e => this.onChange(e)}/>
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
                {/*----- register modal -----*/}
                <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog"
                     aria-labelledby="registerModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="registerModalLabel">客户注册</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-horizontal">
                                        <div className="form-group">
                                            <label htmlFor="register_phone" className="col-sm-3 control-label">手机号码</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_phone" type="text"
                                                       value={this.state.register_phone}
                                                       onChange={e => this.onChange(e)}
                                                       data-toggle="tooltip" data-placement="right" title="该手机号已注册"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_pwd" className="col-sm-3 control-label">登陆密码</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_pwd" type="password"
                                                       value={this.state.register_pwd}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_repwd" className="col-sm-3 control-label">再次输入登陆密码</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_repwd" type="password"
                                                       value={this.state.register_repwd}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_name" className="col-sm-3 control-label">名称</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_name" type="text"
                                                       value={this.state.register_name}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_addr" className="col-sm-3 control-label">地址</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_addr" type="text"
                                                       value={this.state.register_addr}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_leader1" className="col-sm-3 control-label">负责人1</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_leader1" type="text"
                                                       value={this.state.register_leader1}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_mobile1" className="col-sm-3 control-label">负责人1手机号</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_mobile1" type="text"
                                                       value={this.state.register_mobile1}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_leader2" className="col-sm-3 control-label">负责人2</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_leader2" type="text"
                                                       value={this.state.register_leader2}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register_mobile2" className="col-sm-3 control-label">负责人2手机号</label>
                                            <div className="col-sm-9">
                                                <input className="form-control" id="register_mobile2" type="text"
                                                       value={this.state.register_mobile2}
                                                       onChange={e => this.onChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.register()}>注册</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;