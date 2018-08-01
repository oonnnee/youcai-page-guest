import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import LoginService from 'service/login-service.jsx';
import AppUtil from 'util/app-util.jsx';

const loginService = new LoginService();
const appUtil = new AppUtil();

class Top extends React.Component{

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
            window.location.reload(true);
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

    handleLogout(){
        loginService.logout().then(() => {
            appUtil.removeStorage('user');
            window.location.href = "/";
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    render(){
        const user = appUtil.getStorage("user");
        let NavbarRight;
        if (user){
            NavbarRight = (
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown"
                                                     href="javascript:;" aria-expanded="true"><i
                        className="fa fa-user fa-fw"></i>欢迎, {user.name} <i className="fa fa-caret-down"></i></a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="/user"><i className="fa fa-user fa-fw"></i> 我的资料</a></li>
                            <li className="divider"></li>
                            <li>
                                <a href="javascript:;" onClick={() => this.handleLogout()}>
                                    <i className="fa fa-sign-out fa-fw"></i> 退出登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        }else{
            NavbarRight = (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="javascript:;" data-toggle="modal" data-target="#loginModal">登录</a></li>
                    <li><a href="javascript:;" data-toggle="modal" data-target="#registerModal">注册</a></li>
                </ul>
            )
        }
        return (
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">
                            <img src={require('resource/image/brand.png')} />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/">欢迎访问优菜网</a></li>
                            <li><NavLink exact to="/" activeClassName="nav-link-active" className="nav-link" >主页</NavLink></li>
                            <li><NavLink exact to="/product" activeClassName="nav-link-active" className="nav-link">产品</NavLink></li>
                            <li><NavLink exact to="/pricelist" activeClassName="nav-link-active" className="nav-link">报价</NavLink></li>
                            <li><NavLink exact to="/order" activeClassName="nav-link-active" className="nav-link">采购单</NavLink></li>
                            <li><NavLink exact to="/deliver" activeClassName="nav-link-active" className="nav-link">送货单</NavLink></li>
                        </ul>
                        {NavbarRight}
                    </div>
                </div>
                {/*----- login modal -----*/}
                <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog"
                     aria-labelledby="loginModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="loginModalLabel">客户登录</h4>
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


export default Top;