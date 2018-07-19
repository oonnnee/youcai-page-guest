import React from 'react'
import {Link, NavLink} from 'react-router-dom'

class NavSide extends React.Component{

    render(){
        return (
            <nav className="navbar-default navbar-side" role="navigation">
                <div id="sideNav" to=""><i className="fa fa-caret-right"></i></div>
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/home"><i className="fa fa-home"></i>主页</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/home/product"><i className="fa fa-product-hunt"></i>产品列表</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/home/pricelist"><i className="fa fa-gg"></i>查看报价</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/home/order"><i className="fa fa-reorder"></i>我的采购单</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/home/deliver"><i className="fa fa-truck"></i>我的送货单</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

}


export default NavSide;