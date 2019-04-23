import React, { Component } from 'react';

class History extends Component {

    render() {
    
        return (
            <div id="section-content" className={'history container '+this.props.handleView}>
                <div className="content-wrap">History Section</div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default History