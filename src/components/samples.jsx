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
                                <h3>Themes</h3>
                                <p>I built and maintained over a dozen digital portfolio themes, supporting over 30 brands and 7 languages.</p>
                                <p className="hidden-mobile">Design composition files were supplied in PSD format to be converted to working code. All themes were custom 
                                    built for <strong>Search Optics</strong>'&reg; proprietary CMS called <strong>Blueprint</strong>&reg;, a very robust 
                                    and powerful application. I used PHP, JS, jQuery, HTML5 and CSS3 implementing internal and external APIs and widgets.</p>
                                <p className="hidden-mobile">&nbsp;</p>
                                <p>&nbsp;</p>
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="Landers"
                                    onClick={this.props.invokeModal}
                                >LANDING PAGES VIDEO</button> 
                            </div>
                        </div>

                        <div className={this.props.slideIndex === 1 ? 'col col-mob-12 active' : 'col col-mob-12'} >
                            <img alt="experimental theme" src="img/pp-visual.png" />
                            <div 
                                className={this.props.showText ? 'text-box heroText active' : 'text-box heroText'}
                                onClick={this.props.invokeText}
                            >
                                <h3>Animation</h3>
                                <p>Animations are visually appealing and I think they really lift up a theme when they are done right.</p>
                                <p className="hidden-mobile">I especially appreciate animations that visually aid in the intuitiveness of an application as opposed
                                    to gratuitous transitions. In this sample of my work the design called for extensive animations which
                                    need to be long enough for users to understand but fast enough that they arent waiing.</p>
                                <p className="hidden-mobile">This concept theme was never used but it was very fun to build!</p>
                                <p>&nbsp;</p>
                                <p className="hidden-mobile">&nbsp;</p>
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="Animation"
                                    onClick={this.props.invokeModal}
                                >ANIMATIONS VIDEO</button> 
                            </div>
                        </div>

                        <div className={this.props.slideIndex === 2 ? 'col col-mob-12 active' : 'col col-mob-12'}>
                            <img alt="basic themes" src="img/basic.png" />
                            <div 
                                className={this.props.showText ? 'text-box heroText active' : 'text-box heroText'}
                                onClick={this.props.invokeText}
                            >
                                <h3>Working Smarter</h3>
                                <p className="hidden-mobile">Among my greatest contributions to my work at Search Optics was the creation of web components that would 
                                    come to be called <strong>Smart Blocks&trade;</strong>.</p>
                                <p className="hidden-mobile">These components are built to automatically inherit a user-customizable branding styles and are extensible 
                                    providing configurable options to the CMS users as needs change and grow.</p>
                                <p>The sample here demonstrates a single web component used in various themes for hero banner/sliders, multi-tile
                                    tile carousels and more complex HTML tile carousels.</p>
                                <p className="hidden-mobile">&nbsp;</p>
                                <p>&nbsp;</p>
                                <button 
                                    className="primary-button" 
                                    type="button" 
                                    data-video="Sliders"
                                    onClick={this.props.invokeModal}
                                >SLIDERS VIDEO</button> 
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