import React, { Component } from 'react'

class Resume extends Component {

    render() {
    
        return (
            <div id="section-content" className={'resume container '+this.props.handleView}>
                <div className="content-wrap">{
                    this.props.handleView !== 'mobile' ? <iframe title="resume" id="resume" src="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview"></iframe> :
                    <a href="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview" id="downloadResume" class="button primary-button fas fa-download" target="_blank">
                        <div>Click to Download</div>
                    </a>
                }
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Resume