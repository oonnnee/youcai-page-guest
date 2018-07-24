import React from 'react';
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

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
            products: [],
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        pricelistService.findLatest()
            .then(data => {
                let dest = {};

                dest.products = [];
                let products = data.products;
                for (let i=0; i<products.length; i++){
                    dest.products.push({});
                    dest.products[i].id = products[i].id;
                    dest.products[i].name = products[i].name;
                    dest.products[i].marketPrice = products[i].marketPrice;
                    dest.products[i].guestPrice = products[i].guestPrice;
                    dest.products[i].unit = products[i].unit;
                    dest.products[i].num = 1;
                    dest.products[i].note = '';
                }

                dest.guestId = data.guestId;
                dest.date = data.date;
                this.setState(dest)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }


    onInputChange(e){
        const index = e.target.parentElement.parentElement.parentElement.getAttribute('aria-rowindex');
        const name = e.target.getAttribute('name');
        let products = this.state.products;
        products[index][name] = e.target.value;
        this.setState({
            products: products
        });
    }

    onSave(e) {
        let total = 0;
        this.state.products.map(product => {
            total += product.guestPrice*product.num;
        });
        total = total.toFixed(2);
        if (!confirm(`采购单总价为${total}元，确认创建吗？`)){
            return;
        }

        let products = [];
        for (let i=0; i<this.state.products.length; i++){
            const num = Number(this.state.products[i].num);
            const product = this.state.products[i];
            if (isNaN(num)){
                appUtil.errorTip(`第${i+1}行产品名称为'${product.name}'的采购数量非数字`);
                return;
            }
            if (num != 0){
                products.push({});
                const index = products.length - 1;
                products[index].productId = product.id;
                products[index].price = product.guestPrice;
                products[index].num = product.num;
                products[index].note = product.note;
            }
        }
        products = JSON.stringify(products);

        const target = e.target;
        const text = '创建';
        appUtil.disable(target, text);
        orderService.new(products).then(() => {
            appUtil.enable(target, text);
            appUtil.successTip('创建采购单成功');
            window.location.href = '/home/order';
        }, errMsg => {
            appUtil.enable(target, text);
            appUtil.errorTip(errMsg);
        });
    }
    render(){
        const tableHeads = [
            {name: '产品名称', width: '25%'},
            {name: '市场价（元）', width: '10%'},
            {name: '优惠价（元）', width: '10%'},
            {name: '数量', width: '15%'},
            {name: '金额', width: '10%'},
            {name: '备注', width: '30%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="创建采购单" />
                    <BreadCrumb path={[{href: '/home/pricelist', name: '查看报价'}]} current="创建采购单"/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td><Link to={`/home/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td><del>{product.marketPrice}</del></td>
                                        <td>{product.guestPrice}</td>
                                        <td>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name='num'
                                                       value={product.num} onChange={e => this.onInputChange(e)} />
                                                <div className="input-group-addon">{product.unit}</div>
                                            </div>
                                        </td>
                                        <td>{(product.num*product.guestPrice).toFixed(2)}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>创建</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Save;