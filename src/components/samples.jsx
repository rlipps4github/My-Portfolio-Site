import React, { Component } from 'react'
import RDLVideoModal from './rdl-video-modal'

class Samples extends Component {

    render() {

        let percentLeft = '-'+this.props.slideIndex*100+'%'
    
        return (
            <div id="section-content" className={'samples container '+this.props.device}>
                <div className="content-wrap">
                    
                    <div className="row row-scroll">  
                        <div className={this.props.slideIndex === 0 ? 'col col-mob-12 active' : 'col col-mob-12'} style={{ marginLeft: percentLeft }}>
                            <img alt="basic themes" src="img/basic.png" />
                            <div 
                                className={this.props.showText ? 'text-box heroText active' : 'text-box heroText'}
                                onClick={this.props.invokeText}
                            >
                                <h3>Automotive</h3>
                                <p>I built and maintained over a dozen digital portfolio themes, supporting over 30 brands and 7 languages.</p>
                                <p>All themes were custom built for a proprietary CMS using PHP, Vanilla JS, jQuery, HTML5 and CSS3</p>
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="three-basics"
                                    onClick={this.props.invokeModal}
                                >DESKTOP</button> 
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="basic-mob"
                                    onClick={this.props.invokeModal}
                                >MOBILE</button>
                            </div>
                        </div>

                        <div className={this.props.slideIndex === 1 ? 'col col-mob-12 active' : 'col col-mob-12'} >
                            <img alt="experimental theme" src="img/pp-visual.png" />
                            <div 
                                className={this.props.showText ? 'text-box heroText active' : 'text-box heroText'}
                                onClick={this.props.invokeText}
                            >
                                <h3>Animation</h3>
                                <p>I built and maintained over a dozen digital portfolio themes, supporting over 30 brands and 7 languages.</p>
                                <p>All themes were custom built for a proprietary CMS using PHP, Vanilla JS, jQuery, HTML5 and CSS3</p>
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="visual-theme"
                                    onClick={this.props.invokeModal}
                                >DESKTOP</button> 
                            </div>
                        </div>
                    </div>

                    <div 
                        className={this.props.slideIndex === 0 ? 'row-scroll-ctrl lt' : 'row-scroll-ctrl lt active'} 
                        data-dir="left"
                        onClick={this.props.sliderArrowClick}
                    >
                        <i className={this.props.device.indexOf('top') < 0 ? 'fas fa-chevron-left fa-2x' : 'fas fa-chevron-left fa-3x'}></i>
                    </div>

                    <div 
                        className={this.props.slideIndex === this.props.slideCount-1 ? 'row-scroll-ctrl rt' : 'row-scroll-ctrl rt active'} 
                        data-dir="right"
                        onClick={this.props.sliderArrowClick}
                    >
                        <i className={this.props.device.indexOf('top') < 0 ? 'fas fa-chevron-right fa-2x' : 'fas fa-chevron-right fa-3x'}></i>
                    </div>

                    <RDLVideoModal showModal={this.props.showModal} clearModal={this.props.clearModal} device={this.props.device} />
                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default Samples