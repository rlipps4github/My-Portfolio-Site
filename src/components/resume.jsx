import React, { Component } from 'react'

class Resume extends Component {

    render() {
    
        return (
            <div id="section-content" className={'resume container '+this.props.device}>
                <div className="content-wrap">{
                    this.props.device !== 'mobile' ? <iframe className="text-box" title="resume" id="resume" src="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview"></iframe> :
                    
                    <div className="row">
                        <div className="col col-mob-12">
                            <div className="text-box">
                                <p>Wouldn't it be silly to embed a PDF in this tiny space?</p>
                                <p></p>
                                <p className="hidden-mobile"></p>
                                <a href="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview" id="downloadResume" className="button primary-button" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-download"></i> Click to Download
                                </a>
                            </div>
                        </div>
                    </div>

                }
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Resume