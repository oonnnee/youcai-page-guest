import React from 'react';

import AppUtil from 'util/app-util.jsx';
import UserService from 'service/user-service.jsx';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const userService = new UserService();

class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            addr: '',
            mobile1: '',
            leader1: '',
            mobile2: '',
            leader2: '',
            note: ''
        }
    }

    componentDidMount(){
        this.loadProfile();
    }

    // 加载用户信息
    loadProfile(){
        const profile = appUtil.getStorage('user');
        this.setState(profile);
    }

    onInputChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onUpdate(){
        userService.update(this.state).then(() =>  {
            appUtil.setStorage('user', this.state);
            appUtil.successTip('更新用户信息成功');
            window.location.href = '/user';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    render(){
        return (
            <div className="container">
                    <PageTitle title="更新用户信息" />
                    <BreadCrumb path={[{href: '/user', name: '用户信息'}]} current="更新用户信息"/>
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addr" className="col-sm-2 control-label">地址</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="addr" type="text"
                                               value={this.state.addr} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader1" className="col-sm-2 control-label">联系人1</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader1" type="text"
                                               value={this.state.leader1} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile1" className="col-sm-2 control-label">联系人1手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile1" type="text"
                                               value={this.state.mobile1} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="leader2" className="col-sm-2 control-label">联系人2</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="leader2" type="text"
                                               value={this.state.leader2} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile2" className="col-sm-2 control-label">联系人2手机号</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="mobile2" type="text"
                                               value={this.state.mobile2} onChange={e => this.onInputChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3"
                                                  value={this.state.note}
                                                  onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onUpdate()}>更新</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default UserEdit;