import React, { Component } from 'react'
import VideoModal from './video-modal'

let slideDirection = null, slideCount = null, slideTimer = null

class Samples extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideIdx: 0,
            showActive: [false,false],
            showModal: '',
        }
    }

    componentDidMount() {
        slideCount = document.getElementsByClassName('row-scroll')[0].children.length
        clearTimeout(slideTimer)
        slideTimer = setTimeout(this.styleHandler,100)
    }

    componentWillUnmount() {
        clearTimeout(slideTimer)
    }

    arrowClick(direction) {
        const clkTargets = document.getElementsByClassName('row-scroll')[0].children
        const actTargets = document.getElementsByClassName('row-scroll')[0].getElementsByClassName('col active')
        const currentIdx = this.state.slideIdx
        let newIdx = null
        slideCount = slideCount || clkTargets.length
        if (direction === 'left') {
            if (currentIdx > 0) newIdx = currentIdx-1
            else newIdx = 0
        } else {
            if (currentIdx < slideCount-1) newIdx = currentIdx+1
            else newIdx = slideCount-1          
        }
        while(actTargets[0]) actTargets[0].classList.remove('active')
        clkTargets[newIdx].classList.add('active')
        this.setState({ 
            slideIdx: newIdx,
            showActive: [false,false],
            showModal: '',
         })
    }

    styleHandler() {
        if (document.getElementsByClassName('row-scroll').length) {
            const bgTargets = document.getElementsByClassName('row-scroll')[0].children
            for (let x=0; x<bgTargets.length; x++) {
                if (bgTargets[x].getElementsByTagName('img').length) {
                    let thisBg = bgTargets[x].getElementsByTagName('img')[0].src
                    bgTargets[x].style.backgroundImage = 'url('+thisBg+')'
                } else { console.warn('styleHandler: .row-scroll has a child with no background image') }
            }
        }
    } 

    invokeModal(name=null) {
        if (name) {
            this.setState({
                showModal: name,
            })
        }
    }

    clearModal = () => {
        this.setState({
            showModal: '',
        })
    }

    render() {

        let percentLeft = '-'+this.state.slideIdx*100+'%'
    
        return (
            <div id="section-content" className={'samples container '+this.props.handleView}>
                <div className="content-wrap">

                        <div className="row row-scroll">

                            <div className="col col-mob-12 active" style={{ marginLeft: percentLeft }} >
                                <img alt="basic themes" src="img/basic.png" />
                                <div 
                                    className={this.state.showActive[0] ? 'heroText active' : 'heroText'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        this.setState({ showActive: [!this.state.showActive[0],this.state.showActive[1]] })
                                    }}
                                >
                                    <h3>Automotive</h3>
                                    <p>I built and maintained over a dozen digital portfolio themes, supporting over 30 brands and 7 languages.</p>
                                    <p>All themes were custom built for a proprietary CMS using PHP, Vanilla JS, jQuery, HTML5 and CSS3</p>
                                    <button 
                                        className="primary-button" 
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            this.invokeModal('three-basics')
                                        }}
                                    >DESKTOP</button> 
                                    <button 
                                        className="primary-button" 
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            this.invokeModal('basic-mob')
                                        }}
                                    >MOBILE</button>
                                </div>
                            </div>

                            <div className="col col-mob-12" >
                                <img alt="experimental theme" src="img/pp-visual.png" />
                                <div 
                                    className={this.state.showActive[1] ? 'heroText active' : 'heroText'}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        this.setState({ showActive: [this.state.showActive[0],!this.state.showActive[1]] })
                                    }}
                                >
                                    <h3>Animation</h3>
                                    <p>I built and maintained over a dozen digital portfolio themes, supporting over 30 brands and 7 languages.</p>
                                    <p>All themes were custom built for a proprietary CMS using PHP, Vanilla JS, jQuery, HTML5 and CSS3</p>
                                    <button 
                                        className="primary-button" 
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            this.invokeModal('visual-theme')
                                        }}
                                    >DESKTOP</button> 
                                </div>
                            </div>

                        </div>

                        <div 
                            className={this.state.slideIdx === 0 ? 'row-scroll-ctrl lt' : 'row-scroll-ctrl lt active'} 
                            onClick={() => this.arrowClick('left')}
                        >
                            <i className={this.props.handleView.indexOf('top') < 0 ? 'fas fa-chevron-left fa-2x' : 'fas fa-chevron-left fa-3x'}></i>
                        </div>
                        <div 
                            className={this.state.slideIdx === slideCount-1 ? 'row-scroll-ctrl rt' : 'row-scroll-ctrl rt active'} 
                            onClick={() => this.arrowClick('right')}
                        >
                            <i className={this.props.handleView.indexOf('top') < 0 ? 'fas fa-chevron-right fa-2x' : 'fas fa-chevron-right fa-3x'}></i>
                        </div>
                    <VideoModal videoName={this.state.showModal} handleView={this.props.handleView} clickHandler={this.clearModal} />
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Samples