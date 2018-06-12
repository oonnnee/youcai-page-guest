import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'page/home/nav-top.jsx';
import NavSide from 'page/home/nav-side.jsx';
import Index from 'page/home/index.jsx';

/*----- 产品 -----*/
import ProductList from 'page/product/list.jsx';
import ProductDetail from 'page/product/detail.jsx';

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
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Home;