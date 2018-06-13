import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'page/home/nav-top.jsx';
import NavSide from 'page/home/nav-side.jsx';
import Index from 'page/home/index.jsx';

/*----- 产品 -----*/
import ProductList from 'page/product/list.jsx';
import ProductDetail from 'page/product/detail.jsx';
/*----- 报价 -----*/
import PricelistDetail from 'page/pricelist/detail.jsx';
/*----- 订单 -----*/
import OrderSave from 'page/order/save.jsx';
import OrderDetail from 'page/order/detail.jsx';

class Home extends React.Component{

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/home" component={Index}/>
                        {/*----- 产品 -----*/}
                        <Route exact path="/home/product" component={ProductList}/>
                        <Route exact path="/home/product/detail/:id" component={ProductDetail}/>
                        {/*----- 报价 -----*/}
                        <Route exact path="/home/pricelist" component={PricelistDetail}/>
                        {/*----- 订单 -----*/}
                        <Route exact path="/home/order/new" component={OrderSave}/>
                        <Route exact path="/home/order" component={OrderDetail}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Home;