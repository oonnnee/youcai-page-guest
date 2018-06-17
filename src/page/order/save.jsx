import React from 'react';
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';
import OrderService from 'service/order-service.jsx';

const pricelistService = new PricelistService();
const orderService = new OrderService();
const appUtil = new AppUtil();

class Save extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            guestName: '',
            date: {},
            categories: [],
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        pricelistService.findLatest()
            .then(data => {
                this.setState(data)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }


    onInputChange(e){
        const categoryIndex = e.target.getAttribute('categoryindex');
        const productIndex = e.target.getAttribute('productindex');
        const item = e.target.id;

        let categories = this.state.categories;
        categories[categoryIndex].products[productIndex][item] = e.target.value;
        this.setState({
            categories: categories
        });
    }

    onSave(e) {
        let total = 0;
        this.state.categories.map(category => {
            category.products.map(product => {
                total += product.price*product.count;
            })
        })
        total = total.toFixed(2);
        if (!confirm(`采购单总价为${total}元，确认创建吗？`)){
            return;
        }

        let products = [];
        for (let i=0; i<this.state.categories.length; i++){
            const srcProducts = this.state.categories[i].products;
            for (let j=0; j<srcProducts.length; j++) {
                const count = Number(srcProducts[j].count);
                if (count!=0 && isNaN(count)==false){
                    products.push({});
                    const index = products.length - 1;
                    products[index].productId = srcProducts[j].id;
                    products[index].price = srcProducts[j].price;
                    products[index].num = srcProducts[j].count;
                    products[index].note = srcProducts[j].note;
                }
            }
        }
        products = JSON.stringify(products);

        let target = e.target;
        target.innerHTML = '创建中...';
        target.disabled = true;
        orderService.new(products).then(() => {
            target.innerHTML = '创建';
            appUtil.successTip('创建采购单成功');
            window.location.href = '/home/order';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="创建采购单" />
                    <BreadCrumb path={[{href: '/home/pricelist', name: '查看报价'}]} current="创建采购单"/>
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
                                                                                <label htmlFor="price" className="col-sm-4 control-label">金额/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           value={(product.price*product.count).toFixed(2)} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">数量<br/>({product.unit})</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="count"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.count} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.note} onChange={e => this.onInputChange(e)} />
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
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>创建</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Save;