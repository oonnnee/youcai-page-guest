import React from 'react';
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderService from 'service/order-service.jsx';

const orderService = new OrderService();
const appUtil = new AppUtil();

class Save extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: '',
            guestName: appUtil.getCurrentUser().name,
            date: {},
            products: [],
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        orderService.findLatestPricelistWithNum()
            .then(data => {
                this.setState(data);
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }


    onInputChange(e){
        const name = e.target.getAttribute('name');
        let index;
        if (e.target.name == 'num'){
            index = e.target.parentElement.parentElement.parentElement.getAttribute('aria-rowindex');
        } else {
            index = e.target.parentElement.parentElement.getAttribute('aria-rowindex');
        }
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
        if (total == 0){
            appUtil.errorTip('还没有任何采购哦！');
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
            if (num < 0){
                appUtil.errorTip(`第${i+1}行产品名称为'${product.name}'的采购数量小于0`);
                return;
            }

            products.push({});
            const index = products.length - 1;
            products[index].productId = product.id;
            products[index].price = product.guestPrice;
            products[index].num = product.num;
            products[index].note = product.note;
        }

        if (!confirm(`采购单总价为${total}元，确认创建吗？`)){
            return;
        }

        products = JSON.stringify(products);

        const target = e.target;
        const text = '创建';
        appUtil.disable(target, text);
        orderService.new(products).then(() => {
            appUtil.enable(target, text);
            appUtil.successTip('创建采购单成功，工作人员将马上为您送货');
            window.location.href = '/order';
        }, errMsg => {
            appUtil.enable(target, text);
            appUtil.errorTip(errMsg);
        });
    }

    render(){
        const tableHeads = [
            {name: '编号', width: '5%'},
            {name: '产品分类', width: '10%'},
            {name: '产品名称', width: '25%'},
            {name: '市场价（元）', width: '10%'},
            {name: '优惠价（元）', width: '10%'},
            {name: '数量', width: '15%'},
            {name: '金额(元)', width: '10%'},
            {name: '备注', width: '20%'}
        ];
        return (
            <div className="container">
                    <PageTitle title="创建采购单" />
                    <BreadCrumb path={[{href: '/pricelist', name: '查看报价'}]} current="创建采购单"/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td><del>{product.marketPrice}</del></td>
                                        <td>{product.guestPrice}</td>
                                        <td>
                                            <div className="input-group">
                                                <input type="number" className="form-control" name='num'
                                                       value={product.num} onChange={e => this.onInputChange(e)} />
                                                <div className="input-group-addon">{product.unit}</div>
                                            </div>
                                        </td>
                                        <td>{(product.num*product.guestPrice).toFixed(2)}</td>
                                        <td><input type="text" className="form-control" name='note'
                                                   value={product.note} onChange={e => this.onInputChange(e)} /></td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>创建</button>
                    </div>
            </div>
        );
    }
}


export default Save;