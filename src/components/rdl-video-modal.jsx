import React, { Component } from 'react'

class RDLVideoModal extends Component {

    makeMe() {
        if (this.props.showModal === '') {
            document.body.classList.remove('modal-popped')
            return <div className="modal"></div>
        } else {
            document.body.classList.add('modal-popped')
            return (
                <div className="modal pop">
                    <div className="modalContent">
                        <div className="modalCloser" onClick={this.props.clearModal}><i className={this.props.device === 'mobile' ? 'fas fa-times-circle' : 'fas fa-2x fa-times-circle'}></i></div>
                        <video controls controlsList="nodownload" autoPlay loop>
                            <source src={'video/'+this.props.showModal+'.webm'} type="video/webm" />
                            <source src={'video/'+this.props.showModal+'.mp4'} type="video/mp4" />
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

export default RDLVideoModal