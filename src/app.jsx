import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Index from 'page/index/index.jsx';
import Home from 'page/home/home.jsx';

import './app.scss';
import './app.js';

class App extends React.Component{

    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/" component={Index}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
