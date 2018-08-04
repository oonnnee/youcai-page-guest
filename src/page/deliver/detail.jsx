import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverUtil from 'util/deliver-util.jsx';
import DeliverService from 'service/deliver-service.jsx';


const deliverService = new DeliverService();
const appUtil = new AppUtil();
const deliverUtil = new DeliverUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            deliverDate: '',
            orderDate: '',
            dates: [],
            driver: {},
            state: '',
            products: [],
        }
    }

    componentDidMount(){
        this.loadDates();
    }

    loadDates(){
        deliverService.findDates().then(dates => {
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
                this.findOne();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }


    findOne(){
        deliverService.findByDate(this.state.date)
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
            this.findOne();
        })
    }

    receive(){
        if (confirm('确认已收到货物吗？')){
            deliverService.receive(this.state.date)
                .then(() => {
                    alert('收货成功');
                    window.location.reload(true);
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
    }

    render(){
        const tableHeads = [
            {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '25%'},
            {name: '单价(元)', width: '10%'},
            {name: '数量', width: '10%'},
            {name: '金额(元)', width: '15%'},
            {name: '备注', width: '20%'}
        ];

        let date;
        if (this.state.dates.length === 0){
            date = <input type="text" className="form-control" value="暂无送货单" readOnly />
        }else{
            date = (
                <select id="date" value={this.state.orderDate} className="form-control"
                        onChange={e => this.onDateChange(e)}>
                    {
                        this.state.dates.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                </select>
            );
        }

        let pageTitle;
        if (this.state.state == deliverUtil.getStateDelivering().state){
            pageTitle = (
                <PageTitle title="我的送货单" >
                    <button className="btn btn-primary" onClick={() => this.receive()}>
                        <i className="fa fa-check"></i>
                        <span>确认收货</span>
                    </button>
                </PageTitle>
            );
        } else {
            pageTitle = <PageTitle title="我的送货单"/>
        }
        return (
            <div className="container">
                    {pageTitle}
                    <BreadCrumb path={[]} current="我的送货单"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="orderDate" className="col-sm-4 control-label">采购日期</label>
                                    <div className="col-sm-8">
                                        {date}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="deliverDate" className="col-sm-4 control-label">送货日期</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="orderDate" type="text"
                                               value={this.state.deliverDate} readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state" className="col-sm-4 control-label">状态</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="state" type="text"
                                               value={deliverUtil.getShow(this.state.state)} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="driverName" className="col-sm-4 control-label">司机名称</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="driverName"
                                               value={this.state.driver.name} readOnly/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state" className="col-sm-4 control-label">司机电话</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="driverMobile"
                                               value={this.state.driver.mobile} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td>{product.price}</td>
                                        <td>{product.num}<span className="badge">{product.unit}</span></td>
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