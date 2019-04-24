import React, { Component } from 'react';

class Samples extends Component {

    render() {
    
        return (
            <div id="section-content" className={'samples container '+this.props.handleView}>
                <div className="content-wrap">Some samples of my work...</div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Samples