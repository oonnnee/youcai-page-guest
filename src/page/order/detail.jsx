import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderUtil from 'util/order-util.jsx';
import OrderService from 'service/order-service.jsx';


const orderService = new OrderService();
const appUtil = new AppUtil();
const orderUtil  = new OrderUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            date: {},
            state: '',
            dates: [],
            states: [],
            products: [],
            total: 0
        }
    }

    componentDidMount(){
        this.loadDates();
    }

    loadDates(){
        orderService.findDates().then(dates => {
            if (dates==null || dates.length==0){
                this.setState({
                    products: []
                });
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
                this.findOne();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    findOne(){
        orderService.findByDateAndState(this.state.date, this.state.state)
            .then(data => {
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
            this.findOne();
        })
    }

    onBack(){
        if (!confirm('确认退回此采购单吗？')) return;
        orderService.back(this.state.date).then(() => {
            appUtil.successTip('申请退回成功，请等待后台人员处理');
            window.location.reload(true);
        }, err => {
            appUtil.errorTip(err);
        })
    }

    render(){
        const tableHeads = [
            {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '25%'},
            {name: '单价(元)', width: '10%'},
            {name: '数量', width: '10%'},
            {name: '金额(元)', width: '15%'},
            {name: '备注', width: '25%'}
        ];
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
                            let show = orderUtil.getShow(value);
                            return <option key={index} value={value}>{show}</option>
                        })
                    }
                </select>
            );
        }
        return (
            <div className="container">
                    <PageTitle title="我的采购单" >
                        <a className="btn btn-danger" disabled={this.state.state != orderUtil.getStateNew().state}
                            onClick={() => this.onBack()}>
                            <i className="fa fa-chevron-left"></i>
                            <span>退回</span>
                        </a>
                    </PageTitle>
                    <BreadCrumb path={[]} current="我的采购单"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="pdate" className="col-sm-4 control-label">采购单日期</label>
                                    <div className="col-sm-8">{date}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="total" className="col-sm-4 control-label">总计</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="total"
                                               value={this.state.total+' 元'} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="state" className="col-sm-4 control-label">状态</label>
                                    <div className="col-sm-8">{stat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td>{product.price}</td>
                                        <td>
                                            {product.num}
                                            <span className="badge">{product.unit}</span>
                                        </td>
                                        <td>{product.amount}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
            </div>
        );
    }
}


export default Detail;