import React, { Component } from 'react';

class About extends Component {

    render() {

        let percentLeft = '-'+this.props.slideIndex*100+'%'
    
        return (
            <div id="section-content" className={'about container '+this.props.device}>
                <div className="content-wrap">
                    
                    <div className="row row-scroll">  
                        <div className={this.props.slideIndex === 0 ? 'col col-mob-12 column-pad text-box active' : 'col col-mob-12 column-pad text-box'} style={{ marginLeft: percentLeft }}>
                            <h3>About The Build</h3>
                            <p>My portfolio site was concieved of and built by myself at home in the span of about 2 weeks. 
                                The content itself took another 2 weeks.</p>
                            <p className="hidden-mobile">If you are thinking "this guy is not a designer", you are right and I know it's evident here. But this 
                                gives a sense for my execution of UI and UX within a custom reponsive layout.</p>
                            <p>The tools I used are Visual Studio Code, Koala and Affinity and the site was engineered from scratch
                                with React &amp; Node using Javascript, JSX and SCSS.</p>
                        </div>

                        <div className={this.props.slideIndex === 1 ? 'col col-mob-12 column-pad text-box active' : 'col col-mob-12 column-pad text-box'} >
                            <h3>About The Site</h3>
                            <p>This portfolio site features a Single-Page Architecture.</p>
                            <p>If you are thinking "this guy is not a designer" you are right- and it's evident. But this 
                                will give you a sense for my execution of UI and UX within a reponsive layout.</p>
                        </div>
                        
                        <div className={this.props.slideIndex === 2 ? 'col col-mob-12 column-pad text-box active' : 'col col-mob-12 column-pad text-box'} >
                            <h3>About Me</h3>
                            <p>I really enjoy making things that look good and that run well.</p>
                            <p>If you are thinking "this guy is not a designer" you are right- and it's evident. But this 
                                will give you a sense for my execution of UI and UX within a reponsive layout.</p>
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