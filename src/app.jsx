import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Top from 'page/layout/top.jsx';
import Bottom from 'page/layout/bottom.jsx';


import UserProfile from "page/user/user-profile.jsx";
import DeliverDetail from "page/deliver/detail.jsx";
import ProductList from "page/product/list.jsx";
import ProductDetail from "page/product/detail.jsx";
import OrderDetail from "page/order/detail.jsx";
import PricelistDetail from "page/pricelist/detail.jsx";
import OrderSave from "page/order/save.jsx";
import Index from "page/index/index.jsx";
import UserEdit from "page/user/user-edit.jsx";

import './app.scss';

class App extends React.Component{

    render(){
        return (
            <Router>
                <div>
                    <Top/>
                    <Switch>
                        <div>
                            <Route exact path="/" component={Index}/>
                            {/*----- 用户 -----*/}
                            <Route exact path="/user" component={UserProfile}/>
                            <Route exact path="/user/edit" component={UserEdit}/>
                            {/*----- 产品 -----*/}
                            <Route exact path="/product" component={ProductList}/>
                            <Route exact path="/product/detail/:id" component={ProductDetail}/>
                            {/*----- 报价 -----*/}
                            <Route exact path="/pricelist" component={PricelistDetail}/>
                            {/*----- 订单 -----*/}
                            <Route exact path="/order/new" component={OrderSave}/>
                            <Route exact path="/order" component={OrderDetail}/>
                            {/*----- 送货单 -----*/}
                            <Route exact path="/deliver" component={DeliverDetail}/>
                        </div>
                    </Switch>
                    <Bottom/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
