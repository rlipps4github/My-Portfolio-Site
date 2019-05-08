import React, { Component } from 'react'

class Resume extends Component {

    render() {
    
        return (
            <div id="section-content" className={'resume container '+this.props.handleView}>
                <div className="content-wrap">{
                    this.props.handleView !== 'mobile' ? <iframe title="resume" id="resume" src="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview"></iframe> :
                    <a href="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview" id="downloadResume" className="button primary-button" target="_blank" rel="noopener noreferrer">
                        <div>
                            <h4>C'mon!.. It would be silly to embed a PDF in this tiny space...</h4>
                            <p><i className="fas fa-download"></i> Click to Download</p>
                        </div>
                    </a>
                }
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Resume