import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderService from 'service/order-service.jsx';


const orderService = new OrderService();
const appUtil = new AppUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            date: {},
            state: '',
            dates: [],
            states: [],
            categories: [],
        }
    }

    componentDidMount(){
        this.loadDates();
    }

    loadDates(){
        orderService.findDates().then(dates => {
            if (dates==null || dates.length==0){
                return;
            }
            this.setState({
                dates: dates,
                date: dates[0]
            }, () => {
                this.loadStates();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadStates(){
        orderService.findStatesByDate(this.state.date).then(states => {
            if (states==null || states.length==0){
                return;
            }
            this.setState({
                states: states,
                state: states[0]
            }, () => {
                this.loadCategories();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        orderService.findByDateAndState(this.state.date, this.state.state)
            .then(data => {
                data.date = appUtil.getDateString(new Date(data.date));
                this.setState(data);
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDateChange(e){
        this.setState({
            date: e.target.value
        }, () => {
            this.loadStates();
        })
    }

    onStateChange(e){
        this.setState({
            state: e.target.value
        }, () => {
            this.loadCategories();
        })
    }

    onBack(){
        if (!confirm('确认退回此采购单吗？')) return;
        orderService.back(this.state.date).then(() => {
            appUtil.successTip('退回成功');
            window.location.reload(true);
        }, err => {
            appUtil.errorTip(err);
        })
    }

    render(){
        let date;
        if (this.state.dates.length === 0){
            date = <input type="text" className="form-control" value="暂无采购单" readOnly />
        }else{
            date = (
                <select id="date" value={this.state.date} className="form-control"
                        onChange={e => this.onDateChange(e)} style={{marginRight: '20px'}}>
                    {
                        this.state.dates.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                </select>
            );
        }
        let stat;
        if (this.state.states.length === 0){
            stat = <input type="text" className="form-control" value="暂无" readOnly />
        } else{
            stat = (
                <select id="state" value={this.state.state} className="form-control"
                        onChange={e => this.onStateChange(e)}>
                    {
                        this.state.states.map((value, index) => {
                            let show;
                            if (value === '0'){
                                show = '正常';
                            } else{
                                show = `已退回  ( ${value} )`
                            }
                            return <option key={index} value={value}>{show}</option>
                        })
                    }
                </select>
            );
        }
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="我的采购单" >
                        <div className="page-header-right">
                            <a className="btn btn-danger" disabled={this.state.state!='0'}
                                onClick={() => this.onBack()}>
                                <i className="fa fa-chevron-left"></i>&nbsp;
                                <span>退回</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[]} current="我的采购单"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="pdate">采购单日期&nbsp;</label>
                                    {date}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pdate">状态&nbsp;</label>
                                    {stat}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-group margin-top-md" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            this.state.categories.map((category, categoryindex) => {
                                return (
                                    <div className="panel panel-default" key={categoryindex}>
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#'+categoryindex}
                                                   aria-expanded="true" aria-controls="collapseOne">
                                                    {category.name}
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={categoryindex} className="panel-collapse collapse in" role="tabpanel"
                                             aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                {
                                                    category.products.map((product, productindex) => {
                                                        return (
                                                            <div className="col-md-4" key={productindex}>
                                                                <div className="panel panel-default">
                                                                    <div className="form-horizontal">
                                                                        <div className="panel-body">
                                                                            <div className="form-group">
                                                                                <label htmlFor="productId" className="col-sm-4 control-label">id</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productId"
                                                                                           value={product.id} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="productName" className="col-sm-4 control-label">名称</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productName"
                                                                                           value={product.name} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="price" className="col-sm-4 control-label">单价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           value={product.price} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">数量<br/>({product.unit})</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="count"
                                                                                           value={product.num} readOnly/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="price" className="col-sm-4 control-label">总价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="amount"
                                                                                           value={product.amount} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           value={product.note} readOnly />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export default Detail;