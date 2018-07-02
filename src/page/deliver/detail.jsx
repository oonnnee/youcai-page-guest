import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverService from 'service/deliver-service.jsx';


const deliverService = new DeliverService();
const appUtil = new AppUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            guestName: '',
            date: {},
            dates: [],
            driver: {},
            categories: [],
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
                this.loadCategories();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }


    loadCategories(){
        deliverService.findByDate(this.state.date)
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
            this.loadCategories();
        })
    }

    render(){
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
                    <div className="row">
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