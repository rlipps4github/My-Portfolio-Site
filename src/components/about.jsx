import React, { Component } from 'react';

class About extends Component {

    render() {

        let percentLeft = '-'+this.props.slideIndex*100+'%'
    
        return (
            <div id="section-content" className={'about container '+this.props.device}>
                <div className="content-wrap">
                    
                    <div className="row row-scroll">  
                        <div className={this.props.slideIndex === 0 ? 'col col-mob-12 text-box active' : 'col col-mob-12 text-box'} style={{ marginLeft: percentLeft }}>
                            <h3>About The Site</h3>
                            <div>
                                <p>My portfolio site was conceived of and built by myself at home in the span of about 2 weeks. 
                                    The content itself took another 2 weeks to compile and implement.</p>
                                <p className="hidden-mobile">I decided to execute a minimalist design with a focus on making a stateful
                                    and performant application. If you are thinking "this guy is not a designer", you are right 
                                    and I know it's evident here. But I hope it communicates my sensibilities of UI/UX within a custom 
                                    responsive layout.</p>
                                <p>The tools I used are Visual Studio Code, Koala, iMovie, Avidemux, Miro and Affinity. The site was hand-coded
                                    using React &amp; Node with JSX and SCSS.</p>
                            </div>
                        </div>

                        <div className={this.props.slideIndex === 1 ? 'col col-mob-12 text-box active' : 'col col-mob-12 text-box'} >
                            <h3>About The Build</h3>
                            <div>
                                <p>This portfolio site features a <span className="blink header-footer">Single Page Architecture</span>. I have 
                                    incorporated a custom swipe events function for mobile and a wheel events function for mouse driven devices when 
                                    using the <span className="blink scroll-navigation">scroll navigation indicators</span>.</p>
                                <p className="hidden-mobile">I created a <span className="blink row-scroll-controls">custom slider</span> setup that is also swipe-able on touch 
                                    devices.</p>
                                <p>All imagery and media was produced by myself. Typography is courtesy of Google Fonts and FontAwesome for icons.</p>
                            </div>
                        </div>
                        
                        <div className={this.props.slideIndex === 2 ? 'col col-mob-12 text-box active' : 'col col-mob-12 text-box'} >
                            <h3>About Me</h3>
                            <div>
                                <p>I enjoy making websites that look good and that run well.</p>
                                <p>While server side scripting is interesting and can be sufficiently challenging, I find bringing a PSD to life in a browser
                                    satisfies my inner perfectionist. Making something work well is cool- making something work well and look awesome is exciting!</p>
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

                </div>
                <div className="content-background"></div>
            </div>
        )
    
    }

}

export default About