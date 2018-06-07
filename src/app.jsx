import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Index from 'page/index/index.jsx';

class App extends React.Component{

    render(){
        return (
            <Router>
                <Switch>
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
