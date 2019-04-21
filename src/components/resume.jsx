import React, { Component } from 'react'

class Resume extends Component {

    render() {
    
        return (
            <div id="section-content" className="resume container">
                <iframe id="resume" src="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/preview"></iframe>
                <a className="button" href="https://drive.google.com/file/d/1RfU0PUfTCeJyLDrFn8ibGgI8reJeRw-p/view?usp=sharing" target="_blank">
                    <i className="fas fa-download"></i>
                </a>
            </div>
        )
    
    }

}

export default Resume