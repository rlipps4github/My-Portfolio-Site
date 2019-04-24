import React, { Component } from 'react';

class About extends Component {

    render() {
    
        return (
            <div id="section-content" className={'about container '+this.props.handleView}>
                <div className="content-wrap">About this site...</div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default About