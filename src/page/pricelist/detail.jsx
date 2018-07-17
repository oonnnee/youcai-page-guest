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
            'guestId': '',
            'date': {},
            'products': []
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        pricelistService.findLatest()
            .then(data => {
                this.setState(data);
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    render(){
        const tableHeads = [
            {name: '产品id', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '单价', width: '15%'},
            {name: '备注', width: '40%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="查看报价" >
                        <div className="page-header-right">
                            <Link to="/home/order/new" className="btn btn-primary"
                               disabled={this.state.guestId===''?true:false}>
                                <i className="fa fa-plus"></i>&nbsp;
                                <span>创建采购单</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[]} current="查看报价"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="date">最新报价日期&nbsp;</label>
                                    <input type="text" className="form-control" id="date"
                                           value={this.state.guestId===''?'暂无报价':this.state.date} readOnly />
                                </div>
                            </div>
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