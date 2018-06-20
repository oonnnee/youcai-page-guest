import React from 'react';

class Index extends React.Component{

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <div className="jumbotron">
                        <h2>欢迎访问优菜网</h2>
                        <br/>
                        <img src={require('resource/image/carousel1.png')} className="img-responsive" />
                        <br/>
                        <p>新鲜蔬菜 | 价格实惠 | 极速送货</p>
                    </div>

                </div>
            </div>
        );
    }

}

export default Index;