import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'page/home/nav-top.jsx';
import NavSide from 'page/home/nav-side.jsx';
import Index from 'page/home/index.jsx';

class Home extends React.Component{

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/home" component={Index}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Home;