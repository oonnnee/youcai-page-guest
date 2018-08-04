import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';


const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class Detail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            date: {},
            products: []
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        pricelistService.findLatest()
            .then(data => {
                if (data == undefined){
                    this.setState({
                        products: []
                    });
                } else{
                    this.setState(data);
                }
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    render(){
        const tableHeads = [
            {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '市场价（元）', width: '15%'},
            {name: '优惠价（元）', width: '15%'},
            {name: '备注', width: '25%'}
        ];
        return (
            <div className="container">
                    <PageTitle title="查看报价" >
                        <Link to="/order/new" className="btn btn-primary"
                           disabled={this.state.guestId===''?true:false}>
                            <i className="fa fa-plus"></i>
                            <span>创建采购单</span>
                        </Link>
                    </PageTitle>
                    <BreadCrumb path={[]} current="查看报价"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">最新报价日期</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="date"
                                               value={this.state.guestId===''?'暂无报价':this.state.date} readOnly />
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
                                        <td><del>{product.marketPrice}</del></td>
                                        <td>{product.guestPrice} 元/{product.unit}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <Link to="/order/new" disabled={this.state.guestId===''?true:false}
                              className="btn btn-primary btn-lg btn-block">
                            创建采购单
                        </Link>
                    </div>
            </div>
        );
    }
}


export default Detail;