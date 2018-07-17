import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverService from 'service/deliver-service.jsx';


const deliverService = new DeliverService();
const appUtil = new AppUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            date: {},
            dates: [],
            driver: {},
            products: [],
        }
    }

    componentDidMount(){
        this.loadDates();
    }

    loadDates(){
        deliverService.findDates().then(dates => {
            if (dates==null || dates.length==0){
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

    render(){
        const tableHeads = [
            {name: '产品id', width: '15%'},
            {name: '产品名称', width: '25%'},
            {name: '单价', width: '10%'},
            {name: '数量', width: '10%'},
            {name: '金额', width: '15%'},
            {name: '备注', width: '25%'}
        ];
        let date;
        if (this.state.dates.length === 0){
            date = <input type="text" className="form-control" value="暂无送货单" readOnly />
        }else{
            date = (
                <select id="date" value={this.state.date} className="form-control"
                        onChange={e => this.onDateChange(e)}>
                    {
                        this.state.dates.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                </select>
            );
        }
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="我的送货单" />
                    <BreadCrumb path={[]} current="我的送货单"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-12">
                            <form className="form-inline">
                                <div className="form-group margin-right-md">
                                    <label htmlFor="date">送货日期</label>
                                    {date}
                                </div>
                                <div className="form-group margin-right-md">
                                    <label htmlFor="driverName">司机名称</label>
                                    <input type="text" className="form-control" id="driverName"
                                           value={this.state.driver.name} readOnly/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="driverMobile">司机电话</label>
                                    <input type="text" className="form-control" id="driverMobile"
                                            value={this.state.driver.mobile} readOnly/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.num}&nbsp;<span className="badge">{product.unit}</span></td>
                                        <td>{product.amount}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                </div>
            </div>
        );
    }
}


export default Detail;