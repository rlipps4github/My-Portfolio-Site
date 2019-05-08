import React, { Component } from 'react';

class About extends Component {

    render() {
    
        return (
            <div id="section-content" className={'about container '+this.props.handleView}>
                <div className="content-wrap">
                    <div className="content-column col-12-mob">
                        <h3>The Build</h3>
                        <p>This portfolio site was concieved of and built in 40 hours total over a week and a half.</p>
                        <p>If you are thinking "this guy is not a designer" you are right- and it's evident. But this will give you a sense for my execution of UI and UX within a reponsive layout.</p>
                    </div>
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default About