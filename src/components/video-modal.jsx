import React, { Component } from 'react'

class VideoModal extends Component {

    makeMe = () => {
        if (this.props.videoName === '') {
            document.body.classList.remove('modal-popped')
            return <div className="modal"></div>
        } else {
            document.body.classList.add('modal-popped')
            return (
                <div className="modal pop">
                    <div className="modalContent">
                        <div className="modalCloser" onClick={this.props.clickHandler}><i className={this.props.handleView == 'mobile' ? 'fas fa-times-circle' : 'fas fa-2x fa-times-circle'}></i></div>
                        <video controlsList="nofullscreen nodownload" autoPlay loop>
                            <source src={'video/'+this.props.videoName+'.webm'} type="video/webm" />
                            <source src={'video/'+this.props.videoName+'.mp4'} type="video/mp4" />
                            I'm sorry, your browser appears to have become technologically irrelevant.
                        </video>
                    </div>
                </div>
            )
        }
    }

    render () {
        return this.makeMe()
    }

}

export default VideoModal